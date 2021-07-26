import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';

import { MyQuery, MyDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  resolution: number;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);

    this.resolution = instanceSettings.jsonData.resolution || 1e3;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const requests = options.targets.map(async (query) => {
      const response = await this.doRequest(query);

      const frame = new MutableDataFrame({
        refId: query.refId,
        fields: [
          { name: 'time', type: FieldType.time },
          { name: 'value', type: FieldType.number },
        ],
      });

      response.data.forEach((point: { time: string; value: number }) => frame.appendRow([point.time, point.value]));

      return frame;
    });

    const data = await Promise.all(requests);

    return { data };
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }

  async doRequest(query: MyQuery) {
    // TODO: update deprecated API usage
    const response = await getBackendSrv().datasourceRequest({
      method: 'GET',
      url: 'https://api.giphy.com/v1/gifs/search',
      params: { search: 'test', api_key: API_KEY, limit: 5 },
    });

    const { data } = await response.json();

    const result = data.map((gif: GiphyObject) => ({
      time: gif.import_datetime,
      value: parseInt(gif.images.original.size),
    }));

    return result;
  }
}

// TODO: refactor this out
const API_KEY = 'zCBX9zG85N4BqyOh828dugjjGfNFxDtc';

interface GiphyObject {
  import_datetime: string;
  images: {
    original: {
      size: string;
    };
  };
}

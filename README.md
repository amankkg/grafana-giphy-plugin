# Grafana Data Source Plugin Template

[![Build](https://github.com/grafana/grafana-starter-datasource/workflows/CI/badge.svg)](https://github.com/grafana/grafana-starter-datasource/actions?query=workflow%3A%22CI%22)

This template is a starting point for building Grafana Data Source Plugins

## What is Grafana Data Source Plugin?

Grafana supports a wide range of data sources, including Prometheus, MySQL, and even Datadog. There’s a good chance you can already visualize metrics from the systems you have set up. In some cases, though, you already have an in-house metrics solution that you’d like to add to your Grafana dashboards. Grafana Data Source Plugins enables integrating such solutions with Grafana.

## Getting started

1. Install dependencies

   ```bash
   yarn install
   ```

1. Build plugin in development mode or run in watch mode

   ```bash
   yarn dev
   ```

   or

   ```bash
   yarn watch
   ```

1. Build plugin in production mode

   ```bash
   yarn build
   ```

## Run the plugin using Grafana + Docker

1. Install dependencies and build a plugin

1. Run Grafana docker image with path set to parent directory of this repository

   ```bash
   docker run -d -p 3000:3000 -v PARENT_DIR_PATH:/var/lib/grafana/plugins --name=grafana grafana/grafana:7.0.0
   ```

1. Visit http://localhost:3000

1. Sign in (default user is `admin` and its password is `admin`)

1. Go to `Configuration -> Data Sources` and add `grafana-giphy-plugin` data source

1. Create a new dashboard, or edit an existing one

1. Add a plugin to visualize newly added data source

## Learn more

- [Build a data source plugin tutorial](https://grafana.com/tutorials/build-a-data-source-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System

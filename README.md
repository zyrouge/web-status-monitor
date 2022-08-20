<p align="center"><img src="https://github.com/zyrouge/web-status-monitor/blob/main/assets/logo.png?raw=true"></img></p>
<h1 align="center">🛸 Web Status Monitor</h1>
<p align="center">Ping websites at regular intervals using just GitHub Actions!</p>

-   [View Summary](./summary.md)
-   [Edit Config](./config.yaml)

## 🤔 How does it work?

A scheduled GitHub action runs every 5 minutes that pings all the urls after which the [summary](summary.md) is rendered. It's that simple!

## 🚀 Setting up

-   Create repo from this template
-   Add urls in `config.yml`
-   Done!

## ❔ Documentation

### Configuration

`config.defaults`

-   Type: `object`
-   Required: `false`

`config.defaults.method`

-   Type: `get | delete | head | options | post | put | patch`
-   Required: `false`

`config.defaults.headers`

-   Type: `Record<string, string>`
-   Required: `false`

`config.entities`

-   Type: `object[]`
-   Required: `true`

`config.entities[].url`

-   Type: `string`
-   Required: `true`

`config.entities[].method`

-   Type: `get | delete | head | options | post | put | patch`
-   Required: `false`

`config.entities[].headers`

-   Type: `Record<string, string>`
-   Required: `false`

## 📃 License

[License - MIT](./LICENSE)

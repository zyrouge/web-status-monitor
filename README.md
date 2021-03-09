<p align="center"><img src="https://github.com/zyrouge/web-status-monitor/blob/main/assets/logo.png?raw=true"></img></p>
<h1 align="center">🛸 Web Status Monitor</h1>
<p align="center">Ping websites at regular intervals using just GitHub Actions!</p>

- [View Summary](summary.md)
- [Edit Config](config.yml)

## 🤔 How does it work?

A scheduled GitHub action runs every 5 minutes that pings all the urls after which the [summary](summary.md) is rendered. It's that simple!

## 🚀 Setting up

- Create repo from this template
- Add urls in `config.yml`
- Done!

## ❔ Documentation

### Configuration

Option | Type | Description
--- | --- | ---
`urls` | `url[]` | URLs to be pinged
`url.path` | `string` | Actual URL
`url.type` | `string` | HTTP request type
`url.userAgent` | `string` | Custom `User-Agent` header (specific url)
`userAgent` | `string` | Custom `User-Agent` header

## 📃 License

Made by [Zyrouge](https://zyrouge.gq). Licensed under **MIT**.

<h1 align="center">🏓 Pong</h1>

Ping websites at regular intervals using just GitHub Actions!

- [View Summary](summary.md)
- [Edit Config](config.yml)

## 🤔 How does it work?

A scheduled GitHub action runs every 5 minutes that pings all the urls after which the [summary](summary.md) is rendered. It's that simple!

## ⚙️ Setting up

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

## 📃 License

Made by [Zyrouge](https://zyrouge.gq). Licensed under **MIT**.

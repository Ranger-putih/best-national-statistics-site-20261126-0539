[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Ranger-putih/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Ranger-putih/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Indonesia in Figures — 38 provinces, 177 sourced figures, 7 charts, 13.9 KB first load

**Indonesia's headline statistics in one place — population, economy, prices, jobs, poverty and trade, every figure with its source and year.**

An entry for the make.fun bounty [best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539) — "Make the best national statistics site".

## What it is

A single-country national statistics site for Indonesia, built from the published headline values of **BPS — Statistics Indonesia** and **Bank Indonesia** (2020–2024). No framework, no build step, no network: plain `app/` static files with vanilla JS canvas charts, working offline on desktop and phone.

- **Overview** — 8 headline KPIs (population 281.6m, GDP Rp 22,139tn, growth 5.03%, inflation 1.57%, unemployment 4.91%, poverty 8.57%, exports US$264.7bn, HDI 75.02 — all 2024), plus GDP-growth and inflation charts with a working bars/line toggle.
- **Population, Economy, Prices, Jobs, Poverty, Trade** — one page each, every figure sourced and dated, with a chart and a plain-language reading of what the number means.
- **Regions** — all 38 provinces in a searchable, sortable table (population, share, density).
- **Sources** — where every number comes from and how to check the original release.

**First load: 13,891 bytes gzipped** across 6 files (`app/` total 39,900 bytes raw) — no framework, no webfont, no network, fully offline.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Open `app/index.html` directly in a browser works too — everything is relative paths under `app/`.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, stdlib only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored `vendor/makefun-frontend.ts` (unchanged from the kit).

## Screenshots

`shots.json` records how each screenshot in `screenshots/` was taken: the cover (Overview dashboard, 1280×1000 — tall enough that both charts show in full, x-axes included), the Economy page (1280×800) and the Overview on a phone (390×844).

## License

MIT — see [LICENSE](LICENSE).

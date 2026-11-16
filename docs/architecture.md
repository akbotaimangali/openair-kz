# Architecture

A static front-end app: no backend, no database.

```
Browser
  main.js  (UI, Chart.js, events)
    ├─ cities.js   list of cities (lat/lon, names in 3 languages)
    ├─ i18n.js     UI strings en / ru / kk
    ├─ api.js      builds Open-Meteo URL, fetches, falls back to /sample.json
    └─ aqi.js      pure functions: category, parsing, CSV
```

## Data flow
1. User picks a city → `api.js` requests Open-Meteo Air Quality API (`us_aqi`, `pm2_5`, `pm10`; past 1 day + forecast 2 days).
2. `aqi.js` parses it into `{current, hourly[]}`.
3. `main.js` shows the current value with a category colour and advice, and draws the chart.
4. If the request fails, `api.js` loads `public/sample.json` and the UI clearly says it is sample data.

## Design decisions
| Decision | Why |
|---|---|
| Static site, no backend | Cheap to host anywhere, easy to understand, no server to maintain, no personal data |
| Open-Meteo API | Free, no API key, open data licence, global coverage |
| Vite + vanilla JS | Small, fast, little framework knowledge needed for contributors |
| Chart.js (tree-shaken) | Popular, MIT licensed, accessible enough for a prototype |
| Pure logic in `aqi.js` | Testable without a browser |
| Sample-data fallback | Demo works offline; clearly labelled to avoid misleading users |
| MIT licence | Permissive, simple, approved for DPG use |
| i18n dictionary in JS | Lowest barrier for translators |

## How to swap the data source
Implement a function that returns the same `{current, hourly[]}` shape and call it from `loadAirQuality` in `src/api.js`.

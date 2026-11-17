# OpenAir KZ

[![CI](https://github.com/akbotaimangali/openair-kz/actions/workflows/ci.yml/badge.svg)](https://github.com/akbotaimangali/openair-kz/actions/workflows/ci.yml)
[![Deploy](https://github.com/akbotaimangali/openair-kz/actions/workflows/deploy.yml/badge.svg)](https://github.com/akbotaimangali/openair-kz/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Open-source air quality dashboard for cities in Kazakhstan, built on open data.

**Live demo:** https://akbotaimangali.github.io/openair-kz/ · **Repository:** https://github.com/akbotaimangali/openair-kz

## Description
OpenAir KZ shows the current air quality (US AQI, PM2.5, PM10) for Kazakh cities, a 3-day chart (last 24 h + 48 h forecast), a colour scale from "Good" to "Hazardous" with short general advice, and lets you download the data as CSV. The interface is available in Kazakh, Russian and English. It needs no accounts, no API keys and collects no personal data.

## Problem & Solution
**Problem.** Air pollution is a serious health issue in Kazakh cities, especially in cold months. Many popular air quality apps are closed-source, ask for accounts, show data only in English, and do not let people export or reuse the data.

**Solution.** A small, transparent, multilingual web app anyone can run, audit, translate and extend. Data comes from the open [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api), so the project has no vendor lock-in.

> **Data note:** Open-Meteo air quality values come from atmospheric model data (CAMS), not from ground sensors, so they can differ from local sensor readings. See [docs/limitations.md](docs/limitations.md).

## SDG alignment
| SDG | Target | How we contribute |
|---|---|---|
| **3** Good Health and Well-being | 3.9: reduce illnesses from air pollution | Gives people timely information to reduce exposure |
| **11** Sustainable Cities and Communities | 11.6: reduce the environmental impact of cities, including air quality | Makes city air quality visible and comparable |
| **13** Climate Action | 13.3: improve education and awareness | Open data and a reusable base for awareness projects |

More detail: [docs/concept.md](docs/concept.md) and [docs/dpg-checklist.md](docs/dpg-checklist.md).

## How to use
Requirements: [Node.js](https://nodejs.org) 20 or newer.

```bash
git clone https://github.com/akbotaimangali/openair-kz.git
cd openair-kz
npm install
npm run dev        # open the printed local address in a browser
```

Other commands:
```bash
npm test           # unit tests (AQI logic, API parsing, CSV, offline fallback)
npm run build      # production build into dist/
npm run preview    # preview the production build
```

If the live API cannot be reached, the app shows bundled **sample data** and says so on the page.

### Deployment
Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it installs dependencies, runs the tests, builds the site with Vite and publishes `dist/` to **GitHub Pages**. One-time setup: *Settings → Pages → Source: GitHub Actions*.

## How to contribute
We welcome code, translations, new cities and documentation. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the fork → branch → Pull Request workflow, and our [Code of Conduct](CODE_OF_CONDUCT.md).
Quick wins: add a city in `src/cities.js`, improve Kazakh/Russian text in `src/i18n.js`.

## License
- **Code:** [MIT License](LICENSE). You may use, copy, modify and distribute it, including commercially, as long as you keep the copyright notice. We chose MIT because it is simple, permissive and on the list of open licenses approved for Digital Public Goods.
- **Data:** air quality data comes from [Open-Meteo](https://open-meteo.com/en/docs/air-quality-api) (based on Copernicus CAMS models). Open-Meteo requires attribution, and its free API is for **non-commercial** use; check the current [terms](https://open-meteo.com/en/terms) before reuse. The file `public/sample.json` is synthetic demo data, not real measurements.

## Documentation
| File | Content |
|---|---|
| [docs/concept.md](docs/concept.md) | Problem, users, value proposition, SDG alignment |
| [docs/dpg-checklist.md](docs/dpg-checklist.md) | Digital Public Goods Standard, 9 indicators |
| [docs/swot-positioning.md](docs/swot-positioning.md) | Competitors, SWOT, positioning |
| [docs/architecture.md](docs/architecture.md) | How the code is organised |
| [docs/limitations.md](docs/limitations.md) | Known limits and risks |

## Project structure
```
src/          app code (aqi.js logic, api.js data, i18n.js, cities.js, main.js UI)
public/       sample.json (offline demo data)
test/         unit tests (node --test)
docs/         concept and documentation
.github/      CI, GitHub Pages deploy, Dependabot, issue and PR templates
```

## Team members & roles


| Name | GitHub | Role | Contributions |
|---|---|---|---|
| Akbota Imangali | @akbotaimangali | Dev (core) | repo setup, last updated, Pages, CI |
| Beisenbay Dariga | @darigabeisenbay | Dev (UI) | new cities + tests, mobile layout |
| Leila Bakhytzhan | @Leilaa-g | PM / Analyst | problem, sources, SWOT, SIS table |
| Maral Baigoz | @maralbaigoz | Designer / Docs | prototype, README, AI disclosure, i18n |

## AI usage disclosure
_TODO: edit to match what your team really did._ See [docs/ai-disclosure.md](docs/ai-disclosure.md).

## Acknowledgements
Data: [Open-Meteo](https://open-meteo.com). Charts: [Chart.js](https://www.chartjs.org). Build tool: [Vite](https://vite.dev).

# Digital Public Goods Standard: self-assessment

The DPG Standard has 9 indicators. This is the team's **self-assessment**, not an official DPG Alliance review. Check wording against the current standard at <https://digitalpublicgoods.net/standard/> before submitting.

| # | Indicator | Status | How OpenAir KZ addresses it |
|---|---|---|---|
| 1 | Relevance to the SDGs | Met | SDG 3 (3.9), 11 (11.6), 13 (13.3) |
| 2 | Use of approved open licence | Met | Code under MIT (`LICENSE`); upstream data terms (Open-Meteo attribution, non-commercial free tier) documented in README |
| 3 | Clear ownership | Partial | Team and roles listed in README; add an explicit copyright holder/org if the project continues |
| 4 | Platform independence | Met | Only open tech (JS, Vite, Chart.js); data source can be swapped in `src/api.js`; static hosting anywhere |
| 5 | Documentation | Met | README, CONTRIBUTING, `docs/`, code comments |
| 6 | Mechanism for extracting data | Met | CSV export in the UI; open API as upstream source |
| 7 | Adherence to privacy and applicable laws | Met (by design) | No accounts, no analytics, no personal data collected. Only language/city choice stored locally in the browser |
| 8 | Adherence to standards and best practices | Partial | Semantic HTML, keyboard focus styles, CI, tests, Dependabot. Not yet audited for full accessibility (WCAG) |
| 9 | Do no harm by design | Partial | Clear data-source and limitation notes, general non-medical advice with disclaimer; model data is labelled as not ground sensors |

"Partial" items are honest gaps and good candidates for Issues and future work.

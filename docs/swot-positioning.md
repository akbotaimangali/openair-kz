# Competitors, SWOT and positioning

## Competitors / alternatives (to verify)
| Alternative | Type | Open source? | Accounts / ads? | Local languages (kk/ru)? | Data export? |
|---|---|---|---|---|---|
| IQAir / AirVisual | Commercial website and app | Not confirmed | Public map; account for device data export | Russian: yes; Kazakh: not confirmed | CSV for device data |
| World Air Quality Index (WAQI) | Air quality aggregator | Not confirmed | Public map; API token required; ads not verified | Russian: yes; Kazakh: not confirmed | JSON API; CSV not confirmed |
| Kazhydromet | Government environmental service | Not confirmed | Public information; ads not verified | Kazakh and Russian: yes | Public reports; CSV not confirmed |
| Open-Meteo | Open-source API | Yes (AGPLv3) | No account or key for free non-commercial API; ads not verified | Kazakh/Russian: not confirmed | JSON, CSV and XLSX |
| **OpenAir KZ** | Open-source dashboard | Yes (MIT) | No accounts, no ads | Kazakh, Russian, English | CSV in UI |

**Sources:**

1. IQAir: https://www.iqair.com/
2. IQAir data export: https://www.iqair.com/ru/support/knowledge-base/download-or-export-your-airvisual-devices-data
3. WAQI: https://waqi.info/
4. WAQI API: https://aqicn.org/api/
5. Kazhydromet: https://www.kazhydromet.kz/
6. Open-Meteo: https://open-meteo.com/
7. Open-Meteo GitHub: https://github.com/open-meteo/open-meteo
Checked by Leila Bakhytzhan on 17 November 2026.

## SWOT
| | Helpful | Harmful |
|---|---|---|
| **Internal** | **Strengths**<br>• Fully open code and licence<br>• No account, no tracking<br>• 3 languages incl. Kazakh<br>• Simple, easy to extend (add a city in one line)<br>• Offline sample fallback | **Weaknesses**<br>• Model data, not ground sensors (less local precision)<br>• Small team, no funding<br>• No mobile app or alerts<br>• Limited accessibility audit so far |
| **External** | **Opportunities**<br>• Growing public interest in air quality<br>• Open data ecosystem (Open-Meteo, other open APIs)<br>• Schools/universities and civic groups can reuse it<br>• Could later add community or official sensor data | **Threats**<br>• Free API is non-commercial only; limits or terms may change<br>• Well-funded apps with more features<br>• Users may mistake model values for medical truth<br>• Maintainer burnout in volunteer projects |

## Positioning
Axes: **Openness and reusability** (closed → open) vs **Local relevance** (global generic → Kazakhstan-focused).

```
Local relevance
      ^
 high |   [Official pages?]        [ OpenAir KZ ]
      |
 low  |   [IQAir / WAQI?]      [Open-Meteo / raw APIs]
      +-------------------------------------------> Openness
          closed                         open
```
_Positions are the team's hypothesis. Adjust after verifying competitors._

**Positioning statement:** OpenAir KZ is the open, multilingual, privacy-friendly option for Kazakh cities: less feature-rich than commercial apps, but transparent, reusable and community-driven.

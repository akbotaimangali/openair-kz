# Competitors, SWOT and positioning

> TODO (team): **verify every statement about competitors on their real websites** and cite the date you checked. The rows below are a starting hypothesis, not verified facts.

## Competitors / alternatives (to verify)
| Alternative | Type | Open source? | Accounts / ads? | Local languages (kk/ru)? | Data export? |
|---|---|---|---|---|---|
| IQAir / AirVisual | Commercial app and website | _check_ | _check_ | _check_ | _check_ |
| World Air Quality Index (waqi.info) | Aggregator website | _check_ | _check_ | _check_ | _check_ |
| Official national weather/environment service pages (e.g. Kazhydromet) | Government | _check_ | _check_ | _check_ | _check_ |
| Open-Meteo website itself | Open data API | _check_ | _check_ | _check_ | API only |
| **OpenAir KZ** | Open-source dashboard | Yes (MIT) | No accounts, no ads | Kazakh, Russian, English | CSV in UI |

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

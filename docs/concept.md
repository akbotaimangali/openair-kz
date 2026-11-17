# Project concept

## 1. What it is
OpenAir KZ is an open-source web dashboard that shows current and forecast air quality for cities in Kazakhstan, using open data, in Kazakh, Russian and English.

## 2. Why it exists
People need simple, trustworthy air quality information to decide when to ventilate, exercise outdoors or send children outside. Existing tools are often closed, English-first, require accounts, or do not allow data reuse.

## 3. Problem definition

Air pollution is an important environmental and health problem in Kazakhstan, especially in large cities such as Almaty. During the cold season, emissions from heating and transport can affect air quality. People need clear information about air pollution to make better decisions about their daily outdoor activities.

According to the World Health Organization (WHO), the recommended annual average concentration of PM2.5 is 5 µg/m³, and the 24-hour guideline level is 15 µg/m³. Kazhydromet reported a high level of air pollution in Almaty in September 2026 and described the influence of heating and traffic on air pollution.

Existing services, including IQAir, WAQI and Kazhydromet, provide useful air quality information, but their interfaces and data access options are different. Our project, OpenAir KZ, aims to make this information easier to understand and reuse. It provides air quality information in Kazakh, Russian and English, does not require an account, and allows users to download CSV data.

OpenAir KZ is an open-source educational project. It uses model-based air quality data, so it does not replace official measurements from ground monitoring stations.

**Sources:**

1. World Health Organization (2021). WHO Global Air Quality Guidelines. https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants (accessed 17 November 2026).
2. Kazhydromet (2026). Environmental monitoring bulletin for Almaty and Almaty Region, September 2026. https://www.kazhydromet.kz/uploads/files_calendar/13114/file/6ad202757c690almaty-i-almatinskaya-oblast-rus-2026-sentyabr.pdf (accessed 17 November 2026).
3. Open-Meteo. Air Quality API Documentation. https://open-meteo.com/en/docs/air-quality-api (accessed 17 November 2026).

## 4. Target users (personas)
| Persona | Need | How the project helps |
|---|---|---|
| **Aigerim, 35, parent in a large city** | Decide whether it is OK for children to play outside today | Colour-coded status and short advice in her language |
| **Daniyar, 20, student / volunteer developer** | A small real project to learn from and contribute to | Clean code, good first issues (new city, translation), open licence |
| _Optional:_ teacher or NGO | Material for lessons or awareness campaigns | CSV export and open code to adapt |

> Personas are illustrative design aids, not interview results. If you interview real people, document it honestly.

## 5. Value proposition
For residents and students in Kazakhstan who want clear air quality information, OpenAir KZ is a free, open-source, multilingual dashboard that needs no account and lets anyone export, audit and extend the data and code, unlike closed commercial apps.

## 6. SDG alignment
| SDG | Target | Link |
|---|---|---|
| 3 | 3.9 Reduce deaths and illnesses from hazardous chemicals and air, water and soil pollution | Informs people so they can reduce exposure |
| 11 | 11.6 Reduce the adverse per capita environmental impact of cities, including air quality | Makes urban air quality visible |
| 13 | 13.3 Improve education and awareness on climate change mitigation | Open educational resource |

## 7. DPG justification
See [dpg-checklist.md](dpg-checklist.md).

## 8. Market and competitors
See [swot-positioning.md](swot-positioning.md).

## 9. Scope (MVP) and out of scope
**In MVP:** city selector, current AQI/PM2.5/PM10, 72 h chart, colour scale and advice, CSV export, 3 languages, offline sample fallback.
**Out of scope (future work):** ground sensor integration, mobile app, notifications, user accounts, historical archive.

## 10. Link to course material (SIS 1-15)

| SIS | Concept | How we used it |
|---|---|---|
| 1 | Open Source in Your Life | We created a free, open-source air quality website for people in Kazakhstan. |
| 2 | The Impact of Open Source Projects | We used the idea of sharing technology and information for public benefit. |
| 3 | Digital Public Goods Standard | We connected our project to SDGs 3, 11 and 13 and reviewed DPG principles. |
| 4 | Contribution Guide and Community Engagement | We included CONTRIBUTING.md to help new contributors join the project. |
| 5 | Project Roadmap and Governance | We divided responsibilities among four team members and organized tasks using GitHub Issues. |
| 6 | Anatomy of a Collaborative Project | We used GitHub Issues, Pull Requests and reviews for team collaboration. |
| 7 | Your First Contribution Simulation | We created branches, made changes, submitted Pull Requests and reviewed contributions. |
| 8 | Open Source Project Metrics | We can monitor commits, Pull Requests and contributors to evaluate project activity. |
| 9 | CI/CD and Security | We use GitHub Actions to automatically run tests and check code changes. |
| 10 | Documentation Quality | We included README.md, CONTRIBUTING.md and CODE_OF_CONDUCT.md to help users and contributors. |
| 11 | Not covered yet | To be added after completing SIS 11. |
| 12 | Not covered yet | To be added after completing SIS 12. |
| 13 | Not covered yet | To be added after completing SIS 13. |
| 14 | Not covered yet | To be added after completing SIS 14. |
| 15 | Not covered yet | To be added after completing SIS 15. |


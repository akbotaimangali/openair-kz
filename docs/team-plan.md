# Team plan: who commits what (for 4 people)

Goal: visible commits from every member on different days, branches and Pull Requests with cross-review. **Do not push everything in one evening.** Do not fake history: every commit should be real work by the person.

## Setup (Dev 1, day 1)
1. Create the GitHub repo (public), add a README, and add teammates as collaborators.
2. Push the starter files from this folder in a few logical commits (not one giant commit):
   `chore: add project scaffold` → `feat: add AQI logic and tests` → `feat: add UI` → `chore: add LICENSE and Dependabot` → `docs: add README`.
3. Protect `main` (Settings → Branches): require a Pull Request before merging.

## Roles and suggested branches / PRs
| Member | Branch | Pull Request ideas | Cross-reviews |
|---|---|---|---|
| **PM / Analyst** | `docs/concept`, `docs/swot` | Fill `docs/concept.md` (real problem facts), verify competitors in `docs/swot-positioning.md`, create Issues and a milestone | Reviews README PR |
| **Dev 1 (core)** | `feature/data-layer` | Improve `api.js` (error messages, retry), more tests, enable Dependabot, CI badge | Reviews Dev 2's UI PR |
| **Dev 2 (UI)** | `feature/ui-polish` | Mobile layout, accessibility fixes, show "last updated" time, add 2-3 more cities | Reviews Dev 1's PR |
| **Designer / Docs** | `docs/readme`, `design/prototype` | Prototype in Figma/v0 (link + screenshots in `/prototype`), finish README team table, fix Kazakh/Russian strings | Reviews PM's docs PR |

## Suggested Issues to open (and close with PRs)
1. Add more cities (good first issue)
2. Native-speaker review of Kazakh and Russian texts
3. Show "last updated" time on the page
4. Accessibility audit (keyboard, contrast)
5. Add GitHub Pages deployment
6. Investigate adding ground sensor data (future)

## Timeline
| Days | Work |
|---|---|
| 1-2 | Repo, push scaffold in logical commits, open Issues |
| 3-6 | Feature branches, PRs, reviews |
| 7-8 | Deploy to GitHub Pages, prototype screenshots, verify competitors |
| 9-10 | Write the report (each person writes their own section), take screenshots |
| 11 | Final check, every member uploads the PDF/DOCX **themselves** |

## Screenshots to collect for the report
- GitHub repo page (URL visible), Commits page (different authors), a merged Pull Request with review, Insights → Contributors
- Dependabot tab / `dependabot.yml`, CI run
- Prototype (Figma/v0 or the running app), tools used (Claude, Figma, etc.)

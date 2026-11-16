# Contributing to OpenAir KZ

Thanks for helping! Everyone is welcome: code, translations, docs, bug reports.
By contributing you agree that your work is released under the [MIT License](LICENSE) and that you follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute
- **Add a city:** add one entry to `src/cities.js` (id, names in en/ru/kk, latitude, longitude).
- **Fix or improve a translation:** edit `src/i18n.js` (Kazakh and Russian review is especially welcome).
- **Report a bug or suggest a feature:** open an Issue using the templates.
- **Improve docs:** anything in `README.md` or `docs/`.

## Workflow (fork and Pull Request)
1. **Fork** the repository (team members can create a branch in the main repo instead).
2. Create a branch from `main`: `git checkout -b feature/short-description` (or `fix/...`, `docs/...`).
3. Install and run locally:
   ```bash
   npm install
   npm run dev
   ```
4. Make your change. Run the tests before committing:
   ```bash
   npm test
   npm run build
   ```
5. Commit with a clear message (see below) and push your branch.
6. Open a **Pull Request** to `main`, fill in the template, and link the related Issue (`Closes #12`).
7. At least **one team member must review** before merge. Address review comments with new commits.

## Commit messages
Use short, imperative messages with a prefix:
`feat: add city selector`, `fix: handle null AQI values`, `docs: update README usage`, `test: cover AQI boundaries`, `chore: update dependencies`.

## Code style
- Plain JavaScript (ES modules), 2-space indent, semicolons, single quotes.
- Keep logic in pure functions (`src/aqi.js`) so it can be tested without a browser.
- Do not commit secrets or API keys (`.env` is git-ignored). The default data source needs no key.

## Data and privacy rules
- Do not add trackers, analytics or any collection of personal data.
- Health advice text must stay general and non-diagnostic.

## Questions?
Open an Issue with the `question` label.

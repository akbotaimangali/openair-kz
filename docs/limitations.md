# Known limitations and risks

- **Model data, not sensors.** Open-Meteo air quality data is based on atmospheric composition model data (CAMS). It can differ from local sensor readings, especially near sources of pollution. Treat it as an indicator.
- **Not medical advice.** Advice texts are general, based on the AQI category, and shown with a disclaimer.
- **API availability.** The service is third-party. If it is down or its terms change, the app falls back to clearly labelled sample data.
- **Resolution.** One point per city centre, not per district. Per Open-Meteo docs, the model grid is about 11 km (CAMS Europe) or about 45 km (CAMS Global), so results for Kazakhstan may be coarse.
- **Data terms.** Open-Meteo requires attribution (CAMS and Open-Meteo) and its free API is for non-commercial use. A commercial deployment needs a licence from them.
- **Translations.** Kazakh and Russian texts were drafted with AI help and need native-speaker review.
- **Accessibility.** Colours are paired with text labels, but no full WCAG audit has been done.
- **Verify before relying.** Check current terms at <https://open-meteo.com/en/terms>.

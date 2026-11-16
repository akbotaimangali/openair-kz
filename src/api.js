import { parseAirQuality } from './aqi.js';

const ENDPOINT = 'https://air-quality-api.open-meteo.com/v1/air-quality';

/**
 * Build the Open-Meteo Air Quality API URL (no API key needed).
 * Docs: https://open-meteo.com/en/docs/air-quality-api
 */
export function buildUrl(lat, lon) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'us_aqi,pm2_5,pm10',
    hourly: 'us_aqi,pm2_5,pm10',
    past_days: '1',
    forecast_days: '2',
    timezone: 'auto',
  });
  return `${ENDPOINT}?${params}`;
}

/**
 * Fetch live data; if the network or API fails, fall back to bundled sample data
 * so the dashboard (and the demo) still works offline.
 * @returns {Promise<{data: ReturnType<typeof parseAirQuality>, source: 'live'|'sample'}>}
 */
export async function loadAirQuality(city, fetchImpl = fetch) {
  try {
    const res = await fetchImpl(buildUrl(city.lat, city.lon));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { data: parseAirQuality(await res.json()), source: 'live' };
  } catch (err) {
    console.warn('Live data unavailable, using sample data:', err);
    const res = await fetchImpl('./sample.json');
    return { data: parseAirQuality(await res.json()), source: 'sample' };
  }
}

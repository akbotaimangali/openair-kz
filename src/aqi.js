/**
 * Pure AQI helpers (no DOM, no network) so they are easy to unit-test.
 * Categories follow the US EPA AQI scale, which Open-Meteo returns as `us_aqi`.
 */

export const CATEGORIES = [
  { id: 'good', max: 50, color: '#00a651' },
  { id: 'moderate', max: 100, color: '#e6b800' },
  { id: 'sensitive', max: 150, color: '#f47b20' },
  { id: 'unhealthy', max: 200, color: '#d7263d' },
  { id: 'veryUnhealthy', max: 300, color: '#8f3f97' },
  { id: 'hazardous', max: Infinity, color: '#7e0023' },
];

/**
 * Return the AQI category for a numeric AQI value.
 * @param {number|null|undefined} aqi
 * @returns {{id: string, max: number, color: string} | null} null if aqi is not a valid number
 */
export function getCategory(aqi) {
  if (typeof aqi !== 'number' || Number.isNaN(aqi) || aqi < 0) return null;
  return CATEGORIES.find((c) => aqi <= c.max) ?? null;
}

/**
 * Convert the Open-Meteo air-quality response into a small, flat structure.
 * Missing values (null) are kept as null so the chart shows gaps instead of zeros.
 * @param {object} json raw API response
 * @returns {{current: {aqi:number|null, pm25:number|null, pm10:number|null, time:string|null}, hourly: Array<{time:string, aqi:number|null, pm25:number|null, pm10:number|null}>}}
 */
export function parseAirQuality(json) {
  if (!json || typeof json !== 'object' || !json.hourly || !Array.isArray(json.hourly.time)) {
    throw new Error('Unexpected API response format');
  }
  const { time, us_aqi = [], pm2_5 = [], pm10 = [] } = json.hourly;
  const hourly = time.map((t, i) => ({
    time: t,
    aqi: us_aqi[i] ?? null,
    pm25: pm2_5[i] ?? null,
    pm10: pm10[i] ?? null,
  }));
  const cur = json.current ?? {};
  const current = {
    time: cur.time ?? null,
    aqi: cur.us_aqi ?? null,
    pm25: cur.pm2_5 ?? null,
    pm10: cur.pm10 ?? null,
  };
  return { current, hourly };
}

/**
 * Serialize hourly data to CSV (data export, one of the DPG requirements).
 * @param {string} cityName
 * @param {Array<{time:string, aqi:number|null, pm25:number|null, pm10:number|null}>} hourly
 */
export function toCSV(cityName, hourly) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = hourly.map((h) =>
    [esc(cityName), h.time, h.aqi ?? '', h.pm25 ?? '', h.pm10 ?? ''].join(','),
  );
  return ['city,time,us_aqi,pm2_5,pm10', ...rows].join('\n');
}

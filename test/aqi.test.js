import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCategory, parseAirQuality, toCSV, formatTimestamp } from '../src/aqi.js';
import { buildUrl, loadAirQuality } from '../src/api.js';

test('getCategory returns the right EPA category at the boundaries', () => {
  assert.equal(getCategory(0).id, 'good');
  assert.equal(getCategory(50).id, 'good');
  assert.equal(getCategory(51).id, 'moderate');
  assert.equal(getCategory(100).id, 'moderate');
  assert.equal(getCategory(101).id, 'sensitive');
  assert.equal(getCategory(150).id, 'sensitive');
  assert.equal(getCategory(151).id, 'unhealthy');
  assert.equal(getCategory(200).id, 'unhealthy');
  assert.equal(getCategory(201).id, 'veryUnhealthy');
  assert.equal(getCategory(300).id, 'veryUnhealthy');
  assert.equal(getCategory(301).id, 'hazardous');
  assert.equal(getCategory(500).id, 'hazardous');
});

test('getCategory returns null for invalid input', () => {
  assert.equal(getCategory(null), null);
  assert.equal(getCategory(undefined), null);
  assert.equal(getCategory(NaN), null);
  assert.equal(getCategory(-1), null);
});

test('parseAirQuality flattens the API response and keeps nulls', () => {
  const parsed = parseAirQuality({
    current: { time: 't1', us_aqi: 42, pm2_5: 10, pm10: 20 },
    hourly: { time: ['t0', 't1'], us_aqi: [40, null], pm2_5: [9, 10], pm10: [18, 20] },
  });
  assert.equal(parsed.current.aqi, 42);
  assert.equal(parsed.hourly.length, 2);
  assert.equal(parsed.hourly[1].aqi, null);
  assert.equal(parsed.hourly[0].pm25, 9);
});

test('parseAirQuality throws on malformed input', () => {
  assert.throws(() => parseAirQuality({}), /Unexpected API response/);
  assert.throws(() => parseAirQuality(null), /Unexpected API response/);
});

test('toCSV produces header and escaped rows', () => {
  const csv = toCSV('Alma"ty', [{ time: 't0', aqi: 40, pm25: null, pm10: 18 }]);
  const [header, row] = csv.split('\n');
  assert.equal(header, 'city,time,us_aqi,pm2_5,pm10');
  assert.equal(row, '"Alma""ty",t0,40,,18');
});

test('buildUrl contains coordinates and no API key', () => {
  const url = buildUrl(43.238, 76.945);
  assert.match(url, /latitude=43\.238/);
  assert.match(url, /longitude=76\.945/);
  assert.doesNotMatch(url, /key/i);
});

test('loadAirQuality falls back to sample data when the network fails', async () => {
  const sample = {
    current: { time: 't', us_aqi: 55, pm2_5: 12, pm10: 20 },
    hourly: { time: ['t'], us_aqi: [55], pm2_5: [12], pm10: [20] },
  };
  const fakeFetch = async (url) => {
    if (String(url).includes('open-meteo')) throw new Error('offline');
    return { ok: true, json: async () => sample };
  };
  const origWarn = console.warn;
  console.warn = () => {};
  try {
    const { data, source } = await loadAirQuality({ lat: 1, lon: 2 }, fakeFetch);
    assert.equal(source, 'sample');
    assert.equal(data.current.aqi, 55);
  } finally {
    console.warn = origWarn;
  }
});

test('loadAirQuality reports live source on success', async () => {
  const live = {
    current: { time: 't', us_aqi: 80, pm2_5: 25, pm10: 40 },
    hourly: { time: ['t'], us_aqi: [80], pm2_5: [25], pm10: [40] },
  };
  const { source } = await loadAirQuality({ lat: 1, lon: 2 }, async () => ({ ok: true, json: async () => live }));
  assert.equal(source, 'live');
});

test('formatTimestamp shows the API local time as DD.MM.YYYY HH:MM', () => {
  assert.equal(formatTimestamp('2026-11-16T21:00'), '16.11.2026 21:00');
  assert.equal(formatTimestamp('2026-01-05T07:45'), '05.01.2026 07:45');
});

test('formatTimestamp returns null for missing or malformed values', () => {
  assert.equal(formatTimestamp(null), null);
  assert.equal(formatTimestamp(undefined), null);
  assert.equal(formatTimestamp('yesterday'), null);
});

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { CATEGORIES, getCategory, toCSV } from './aqi.js';
import { CITIES } from './cities.js';
import { loadAirQuality } from './api.js';
import { STRINGS, LANGS } from './i18n.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const $ = (id) => document.getElementById(id);

const state = {
  lang: localStorage.getItem('lang') || 'ru',
  cityId: localStorage.getItem('city') || 'almaty',
  result: null,
  chart: null,
};

const t = () => STRINGS[state.lang];
const currentCity = () => CITIES.find((c) => c.id === state.cityId) ?? CITIES[0];

function fillSelects() {
  $('citySelect').innerHTML = CITIES.map(
    (c) => `<option value="${c.id}">${c.name[state.lang]}</option>`,
  ).join('');
  $('citySelect').value = state.cityId;
  $('langSelect').innerHTML = LANGS.map((l) => `<option value="${l.id}">${l.label}</option>`).join('');
  $('langSelect').value = state.lang;
}

function renderStaticText() {
  const s = t();
  document.documentElement.lang = state.lang;
  $('subtitle').textContent = s.subtitle;
  $('lblCity').textContent = s.city;
  $('lblLang').textContent = s.language;
  $('lblNow').textContent = s.now;
  $('lblAqi').textContent = s.aqiLabel;
  $('chartTitle').textContent = s.chartTitle;
  $('csvBtn').textContent = s.exportCsv;
  $('disclaimer').textContent = s.disclaimer;
  $('legend').innerHTML = CATEGORIES.map((c, i) => {
    const from = i === 0 ? 0 : CATEGORIES[i - 1].max + 1;
    const range = c.max === Infinity ? `${from}+` : `${from}–${c.max}`;
    return `<span><i style="background:${c.color}"></i>${range} ${s.cat[c.id]}</span>`;
  }).join('');
}

function renderCurrent() {
  const s = t();
  const { data, source } = state.result;
  // Prefer the "current" value; fall back to the latest hourly value that is not in the future.
  const aqi = data.current.aqi;
  const cat = getCategory(aqi);
  $('aqiValue').textContent = aqi ?? '–';
  $('pm25').textContent = data.current.pm25 ?? '–';
  $('pm10').textContent = data.current.pm10 ?? '–';
  const badge = $('aqiBadge');
  if (cat) {
    badge.textContent = s.cat[cat.id];
    badge.style.background = cat.color;
    $('advice').textContent = s.advice[cat.id];
  } else {
    badge.textContent = s.noData;
    badge.style.background = '';
    $('advice').textContent = '';
  }
  $('source').textContent = source === 'live' ? s.sourceLive : s.sourceSample;
}

function renderChart() {
  const { hourly } = state.result.data;
  const labels = hourly.map((h) => h.time.slice(5).replace('T', ' '));
  const aqiData = hourly.map((h) => h.aqi);
  const pmData = hourly.map((h) => h.pm25);
  // Colour every AQI point by its category so the chart is readable at a glance.
  const pointColors = aqiData.map((v) => getCategory(v)?.color ?? '#999');

  if (state.chart) state.chart.destroy();
  state.chart = new Chart($('chart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'US AQI',
          data: aqiData,
          borderColor: '#0b5cad',
          pointBackgroundColor: pointColors,
          pointBorderColor: pointColors,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y',
        },
        {
          label: 'PM2.5 (µg/m³)',
          data: pmData,
          borderColor: '#6b7280',
          borderDash: [6, 4],
          pointRadius: 0,
          tension: 0.3,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 8 } },
        y: { beginAtZero: true, title: { display: true, text: 'AQI' } },
        y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'PM2.5' } },
      },
    },
  });
}

async function refresh() {
  $('aqiBadge').textContent = t().loading;
  state.result = await loadAirQuality(currentCity());
  renderCurrent();
  renderChart();
}

function downloadCsv() {
  const city = currentCity();
  const csv = toCSV(city.name.en, state.result.data.hourly);
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `openair-${city.id}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

$('citySelect').addEventListener('change', (e) => {
  state.cityId = e.target.value;
  localStorage.setItem('city', state.cityId);
  refresh();
});

$('langSelect').addEventListener('change', (e) => {
  state.lang = e.target.value;
  localStorage.setItem('lang', state.lang);
  fillSelects();
  renderStaticText();
  if (state.result) renderCurrent();
});

$('csvBtn').addEventListener('click', downloadCsv);

fillSelects();
renderStaticText();
refresh();

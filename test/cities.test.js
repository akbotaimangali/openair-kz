import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CITIES } from '../src/cities.js';
test('every city has a unique id', () => {
 const ids = CITIES.map((c) => c.id);
 assert.equal(new Set(ids).size, ids.length);
});
test('every city has a name in en, ru and kk', () => {
 for (const c of CITIES) {
 for (const lang of ['en', 'ru', 'kk']) {
 assert.ok(c.name[lang], `${c.id} is missing ${lang} name`);
 }
 }
});
test('every city has coordinates inside Kazakhstan', () => {
 for (const c of CITIES) {
 assert.ok(c.lat > 40 && c.lat < 56, `${c.id} latitude out of range`);
 assert.ok(c.lon > 46 && c.lon < 88, `${c.id} longitude out of range`);
 }
});

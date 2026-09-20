import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { getResorts } from '../server/resorts.js';
const resorts = getResorts();
test('directory contains unique, bilingual, sourced stays', () => {
  assert.equal(resorts.length,41);
  assert.equal(new Set(resorts.map(r=>r.id)).size,resorts.length);
  assert.equal(resorts.filter(r=>r.district==='Kannur').length,34);
  assert.equal(resorts.filter(r=>r.district==='Kasaragod').length,7);
  for (const r of resorts) {
    for(const key of ['name','nameMl','area','areaMl','description','descriptionMl','address','sourceUrl','checkedOn']) assert.ok(r[key],`${r.id}: ${key}`);
    assert.ok(['beach','hills','backwater','wellness'].includes(r.kind));
    assert.equal(new URL(r.sourceUrl).protocol,'https:');
    if(r.phone) assert.match(r.phone,/^\+91\d{10}$/);
    if(r.image) {
      assert.ok(existsSync(new URL(`../public${r.image}`,import.meta.url)));
      assert.ok(existsSync(new URL(`../public${r.image.replace('cover.webp','cover-small.webp')}`,import.meta.url)));
      assert.ok(r.imageSource);
    }
  }
});
test('new coastal listings are distinct and searchable by neighborhood', () => {
  const thottada = resorts.filter(r=>`${r.area} ${r.address}`.toLowerCase().includes('thottada'));
  const adikadalayi = resorts.filter(r=>`${r.area} ${r.address}`.toLowerCase().includes('adikadalayi'));
  assert.ok(thottada.length >= 12);
  assert.ok(adikadalayi.length >= 5);
  assert.equal(new Set(resorts.map(r=>r.name.toLowerCase())).size,resorts.length);
});
test('Google links include the property name and address, not just Kannur', () => {
  for(const r of resorts) {
    assert.equal(new URL(r.mapsUrl).searchParams.get('query'),`${r.name}, ${r.address}`);
    assert.equal(new URL(r.directionsUrl).searchParams.get('destination'),`${r.name}, ${r.address}`);
    assert.equal(new URL(r.photosUrl).searchParams.get('tbm'),'isch');
  }
});
test('compromised Club 7 website is not linked',()=> {
  const r=resorts.find(r=>r.id==='club-7-beach-resort');
  assert.equal(new URL(r.sourceUrl).hostname,'www.google.com');
});

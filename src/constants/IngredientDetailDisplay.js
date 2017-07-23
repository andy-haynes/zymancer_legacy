import React from 'react';
import zymath from '../utils/zymath';

export const displayKeys = {
  url: 'Source URL',
  mfg: 'Manufacturer',
  DBFG: 'Dry Basis Fine Grind',
  lovibond: '° Lovibond',
  gravity: 'Specific Gravity',
  lintner: 'Lintner',
  alphaRange: 'Alpha Acid',
  betaRange: 'Beta Acid',
  aroma: 'Aroma',
  categories: 'Categories',
  code: 'Code',
  styles: 'Styles',
  toleranceLow: 'Alcohol Tolerance Min',
  toleranceHigh: 'Alcohol Tolerance Max',
  attenuationLow: 'Min Attenuation',
  attenuationHigh: 'Max Attenuation',
  temperatureLow: 'Min Temperature',
  temperatureHigh: 'Max Temperature',
  coHumulone: 'Co-Humulone',
  totalOil: 'Total Oil',
  myrcene: 'Myrcene',
  caryophyllene: 'Caryophyllene',
  farnesene: 'Farnesene',
  humulene: 'Humulene',
  geraniol: 'Geraniol'
};

export const detailDisplay = Object.assign(
  Object.keys(displayKeys).reduce((keys, k) => {
    keys[k] = (ingredient) => ingredient[k];
    return keys;
  }, {}), {
  categories: (i) => (i.categories || []).join(', '),
  styles: (i) => i.styles,
  gravity: (i) => zymath.formatGravity(i.gravity),
  url: (i) => (
    <a href={i.url} target="_blank">
      {i.url.split('/').splice(0, 3).join('/')}
    </a>
  ),
  alphaRange: (i) => `${i.alphaRange}%`,
  betaRange: (i) => `${i.betaRange}%`
});

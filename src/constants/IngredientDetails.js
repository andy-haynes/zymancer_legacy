import React from 'react';

export const displayKeys = {
  url: 'Source URL',
  mfg: 'Manufacturer',
  DBFG: 'DBFG',
  lovibond: '°L',
  gravity: 'SG',
  flavor: 'Flavor',
  lintner: 'Lintner',
  alpha: 'Alpha',
  beta: 'Beta',
  categories: 'Categories',
  code: 'Code',
  styles: 'Styles',
  toleranceLow: 'Alcohol Tolerance Min',
  toleranceHigh: 'Alcohol Tolerance Max',
  attenuationLow: 'Min Attenuation',
  attenuationHigh: 'Max Attenuation',
  temperatureLow: 'Min Temperature',
  temperatureHigh: 'Max Temperature'
};

export const detailDisplay = Object.assign(
  Object.keys(displayKeys).reduce((keys, k) => {
    keys[k] = (ingredient) => ingredient[k];
    return keys;
  }, {}), {
  url: (i) => (<a href={i.url}>{i.url}</a>),
  categories: (i) => (i.categories || []).join(', '),
  styles: (i) => i.styles
});
import _ from 'lodash';
import { Fahrenheit, Celsius } from '../constants/Units';
import conversionTable from '../constants/ConversionTable';

const convertTemp = (temp, unit) => {
  if (temp.unit === unit) {
    return temp.value;
  } else if (temp.unit === Fahrenheit && unit === Celsius) {
    return (temp.value - 32) * 5/9;
  } else if (temp.unit === Celsius && unit === Fahrenheit) {
    return (temp.value * 9/5) + 32
  }
  return 0;
};

export const roundTo = (value, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

export const convertToUnit = (measurement, unit, precision = undefined) => {
  let converted = parseFloat(measurement.value);
  if (measurement.unit !== unit) {
    if (unit === Fahrenheit || unit === Celsius) {
      converted = convertTemp(measurement, unit);
    } else {
      converted *= conversionTable[measurement.unit][unit];
    }
  }
  
  return precision ? roundTo(converted, precision) : converted;
};

export const extractRange = (raw) => {
  const comp = (raw || '').split('-').map(r => parseFloat(r));
  const low = !isNaN(comp[0]) ? comp[0] : 0;
  return comp.length === 2 && low !== comp[1] && !isNaN(comp[1]) ? {
    low,
    high: comp[1],
    avg: (low + comp[1]) / 2
  } : { low, avg: low };
};

const _msMonths = 1000 * 60 * 60 * 24 * 30;

export const monthsSinceDate = (date) => (new Date() - date) / _msMonths;
export const subtractMonthsFromNow = (months) => new Date(new Date() - (months * _msMonths));
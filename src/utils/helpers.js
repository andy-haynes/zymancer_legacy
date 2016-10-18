import Units from '../constants/Units';
import conversionTable from '../constants/ConversionTable';
import _ from 'lodash';

function convertTemp(temp, unit) {
  if (temp.unit === unit) {
    return temp.value;
  } else if (temp.unit === Units.Fahrenheit && unit === Units.Celsius) {
    return (temp.value - 32) * 5/9;
  } else if (temp.unit === Units.Celsius && unit === Units.Fahrenheit) {
    return (temp.value * 9/5) + 32
  }
  return 0;
}

function convertToUnit(measurement, unit, precision = undefined) {
  let converted = parseFloat(measurement.value);
  if (measurement.unit !== unit) {
    if (unit === Units.Fahrenheit || unit === Units.Celsius) {
      converted = convertTemp(measurement, unit);
    } else {
      converted *= conversionTable[measurement.unit][unit];
    }
  }
  
  return precision ? _.round(converted, precision) : converted;
}

function convertRatio(oldRatio, newRatio, precision = undefined) {
  let value = parseFloat(newRatio.value || oldRatio.value) || 0;
  let multiplier = 1;
  let divisor = 1;

  if (oldRatio.antecedent !== newRatio.antecedent) {
    multiplier = convertToUnit({ value: 1, unit: oldRatio.antecedent }, newRatio.antecedent);
  }

  if (oldRatio.consequent !== newRatio.consequent) {
    divisor = convertToUnit({ value: 1, unit: oldRatio.consequent }, newRatio.consequent);
  }

  value = (multiplier * value) / divisor;
  if (precision) {
    value = _.round(value, precision);
  }

  return Object.assign({}, newRatio, { value });
}


function extractRange(raw) {
  const comp = (raw || '').split('-').map(r => parseFloat(r));
  const low = !isNaN(comp[0]) ? comp[0] : 0;
  let ret = comp.length === 2 && low !== comp[1] && !isNaN(comp[1]) ? {
    high: comp[1],
    avg: (low + comp[1]) / 2
  } : { avg: low };

  return Object.assign(ret, {
    low,
    toString: () => ret.low ? `${ret.low}` + (ret.high && `–${ret.high}`) : undefined
  });
}

const _msMonths = 1000 * 60 * 60 * 24 * 30;

function monthsSinceDate(date) {
  return (new Date() - date) / _msMonths;
}
function subtractMonthsFromNow(months) {
  return new Date(new Date() - (months * _msMonths));
}

// recursively stringify json without quoting keys
function jsonToGraphql(obj) {
  function parseKeys (o, str) {
    Object.keys(o).forEach(k => {
      if (typeof o[k] === 'object') {
        if (Object.keys(o[k])) {
          if (typeof o[k].length === 'undefined') {
            str += `${k}:{${parseKeys(o[k], '')}},`;
          } else {
            str += o[k].map(v => parseKeys(v, '')).join(',');
          }
        } else {
          str += o[k].toString();
        }
      } else if (['number', 'string'].indexOf(typeof o[k]) > -1) {
        if (!isNaN(o[k])) {
          str += `${k}:${o[k]},`;
        } else {
          str += `${k}:"${o[k]}",`;
        }
      }
    });

    return str.substring(0, str.length - 1);
  }

  return `{${parseKeys(obj, '')}}`;
}

export default {
  convertTemp,
  convertRatio,
  convertToUnit,
  extractRange,
  monthsSinceDate,
  subtractMonthsFromNow,
  jsonToGraphql
};
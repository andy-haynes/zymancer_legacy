import Units from '../constants/Units';
import conversionTable from '../constants/ConversionTable';
import _ from 'lodash';

//region unit conversion
function convertTemp(temp, unit) {
  if (temp.unit === unit) {
    return temp;
  } else if (temp.unit !== unit) {
    const convert = temp.unit === Units.Fahrenheit ? t => (t - 32) * 5/9 : t => (t * 9/5) + 32;
    return {
      value: _.round(convert(temp.value), 1),
      min: _.round(convert(temp.min), 0),
      max: _.round(convert(temp.max), 0),
      unit
    };
  }
  return { value: 0, unit };
}

function convertToUnit(measurement, unit, precision = undefined) {
  if (measurement.unit !== unit) {
    if (unit === Units.Fahrenheit || unit === Units.Celsius) {
      return convertTemp(measurement, unit);
    } else {
      const factor = conversionTable[measurement.unit][unit];
      const converted = parseFloat(measurement.value) * factor;

      return {
        value: precision ? _.round(converted, precision) : converted,
        min: _.round(measurement.min * factor, 0),
        max: _.round(measurement.max * factor, 0),
        unit
      };
    }
  }

  return measurement;
}

function convertRatio(oldRatio, newRatio, precision = undefined) {
  let value = parseFloat(newRatio.value || oldRatio.value) || 0;
  let { min, max } = oldRatio;
  let multiplier = 1;
  let divisor = 1;

  if (oldRatio.antecedent !== newRatio.antecedent) {
    multiplier = convertToUnit({ value: 1, unit: oldRatio.antecedent }, newRatio.antecedent).value;
  }

  if (oldRatio.consequent !== newRatio.consequent) {
    divisor = convertToUnit({ value: 1, unit: oldRatio.consequent }, newRatio.consequent).value;
  }

  const factor = multiplier / divisor;
  value *= factor;
  min = (min || 0) * factor;
  max = (max || 0) * factor;

  if (precision) {
    value = _.round(value, precision);
  }

  return Object.assign({}, newRatio, { value, min, max });
}

function createRatio(numerator, denominator, min, max) {
  return {
    value: numerator.value / denominator.value,
    antecedent: numerator.unit,
    consequent: denominator.unit,
    min: min || 0,
    max: max || 0
  };
}
//endregion

//region strings
function extractRange(raw) {
  const comp = (raw || '').split('-').map(r => parseFloat(r));
  const low = !isNaN(comp[0]) ? comp[0] : 0;
  let ret = comp.length === 2 && low !== comp[1] && !isNaN(comp[1]) ? {
    high: comp[1],
    avg: (low + comp[1]) / 2
  } : { avg: low };

  return Object.assign(ret, {
    low,
    toString: () => ret.low ? `${ret.low}` + (typeof ret.high !== 'undefined' ? `–${ret.high}` : '') : ''
  });
}
//endregion

//region dates
const _msMonths = 1000 * 60 * 60 * 24 * 30;

function monthsSinceDate(date) {
  return (new Date() - date) / _msMonths;
}
function subtractMonthsFromNow(months) {
  return new Date(new Date() - (months * _msMonths));
}
//endregion

//region api
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
//endregion

//region redux
function createAction(type, ...argNames) {
  return function(...args) {
    let action = { type };

    if (argNames && argNames.length) {
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index];
      });
    }

    return action;
  }
}
//endregion

export default {
  convertTemp,
  convertRatio,
  createRatio,
  convertToUnit,
  extractRange,
  monthsSinceDate,
  subtractMonthsFromNow,
  jsonToGraphql,
  createAction
};
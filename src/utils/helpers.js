import Units from '../constants/Units';
import conversionTable from '../constants/ConversionTable';
import round from 'lodash/round';

//region unit conversion
function convertTemp(temp, unit) {
  if (temp.unit === unit) {
    return temp;
  } else if (temp.unit !== unit) {
    const convert = temp.unit === Units.Fahrenheit ? t => (t - 32) * 5/9 : t => (t * 9/5) + 32;
    return {
      value: round(convert(temp.value), 1),
      min: round(convert(temp.min), 0),
      max: round(convert(temp.max), 0),
      unit
    };
  }
  return { value: 0, unit };
}

function convertToUnit(measurement, unit, precision = undefined) {
  const value = parseFloat(measurement.value) || 0;

  if (measurement.unit !== unit) {
    if (unit === Units.Fahrenheit || unit === Units.Celsius) {
      return convertTemp(measurement, unit);
    } else {
      const factor = conversionTable[measurement.unit][unit];
      const converted = value * factor;

      return {
        value: precision ? round(converted, precision) : converted,
        min: round(measurement.min * factor, 0),
        max: round(measurement.max * factor, 0),
        unit
      };
    }
  }

  return Object.assign({}, measurement, { value });
}

function sortMeasurements(getMeasurement, unit, asc = true) {
  return (a, b) => {
    const [aValue, bValue] =  [a, b].map(m => convertToUnit(getMeasurement(m), unit).value);
    if (asc) {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  };
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
    value = round(value, precision);
  }

  return Object.assign({}, newRatio, { value, min, max });
}

function multiplyRatioByMeasurement(ratio, measurement, precision) {
  const ratioFactor = convertRatio(ratio, { antecedent: ratio.antecedent, consequent: measurement.unit }).value;
  return {
    value: round(measurement.value * ratioFactor, precision),
    unit: ratio.antecedent
  };
}

function sumMeasurements(precision, ...measurements) {
  return measurements.reduce((a, b) => a.value === undefined ? b : {
    value: round(a.value + convertToUnit(b, a.unit).value, precision),
    unit: a.unit
  }, {});
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

//region numbers
function numberOrNull(number) {
  return (n => isNaN(n) ? null : n)(parseFloat(number));
}
//endregion

//region strings
function extractRange(raw) {
  if (typeof raw === 'number') {
    return { avg: raw };
  }

  let comp = (raw || '').split('-');
  if (comp.length === 1) {
    comp = comp[0].split('–');
  }
  comp = comp.map(r => parseFloat(r));

  const low = !isNaN(comp[0]) ? comp[0] : 0;
  let ret = comp.length === 2 && low !== comp[1] && !isNaN(comp[1]) ? {
    high: comp[1],
    avg: (low + comp[1]) / 2
  } : { avg: low };

  return Object.assign(ret, {
    low,
    toString: () => ret.low ? `${ret.low}` + (typeof ret.high !== 'undefined' && ` - ${ret.high}`) : ''
  });
}

// return true for strings ending in '.' to detect incomplete input of a decimal
function isIncompleteDecimal(value) {
  return typeof value === 'string' && value[value.length - 1] === '.';
}

function displayMeasurementValue(n) {
  return isNaN(n) ? '∞' : n;
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
      if (o[k] !== null) {
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
        } else if (['number', 'string'].includes(typeof o[k])) {
          if (typeof o[k] === 'number') {
            str += `${k}:${o[k]},`;
          } else {
            str += `${k}:"${o[k].replace(/"/g, '\'')}",`;
          }
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

function ignoreNonNumeric(state, action, key) {
  if (!action[key].match(/\d+\.?\d*/)) {
    return state;
  }

  return Object.assign({}, state, {
    [key]: parseFloat(action[key] )
  });
}
//endregion

//region mobile
function formatIngredientName(name) {
  const maxLen = 17;
  if (name.length <= maxLen) {
    return name;
  }

  const components = name.split(' ');
  if (components[0].length > maxLen) {
    return `${components[0].substring(0, maxLen)}...`;
  }

  let i = 0;
  let abb = '';
  do {
    abb += components[i++] + ' ';
  } while (abb.length < maxLen);
  return `${abb.trim()}...`;
}
//endregion

export default {
  convertTemp,
  convertRatio,
  createRatio,
  convertToUnit,
  sortMeasurements,
  multiplyRatioByMeasurement,
  sumMeasurements,
  numberOrNull,
  extractRange,
  isIncompleteDecimal,
  displayMeasurementValue,
  monthsSinceDate,
  subtractMonthsFromNow,
  jsonToGraphql,
  createAction,
  ignoreNonNumeric,
  mobile: {
    formatIngredientName
  }
};

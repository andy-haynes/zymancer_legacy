import {
  Gallon,
  Quart,
  Liter,
  Pound,
  Ounce,
  Kilogram,
  Gram,
  Fahrenheit,
  Celsius,
  Hour,
  Minute
} from './Units';

const _displayAbbreviations = {
  Gallon: 'gallon',
  Quart: 'qt',
  Liter: 'liter',
  Pound: 'lbs',
  Ounce: 'oz',
  Kilogram: 'kg',
  Gram: 'g',
  Fahrenheit: '°F',
  Celsius: '°C',
  Hour: 'hour',
  Minute: 'minute'
};

const _createOptions = (...options) => {
  return options.map((o, i) => ({ value: o, order: i, name: _displayAbbreviations[o] }));
};

export const HopAdditionWeight = _createOptions(Ounce, Gram, Pound, Kilogram);
export const RecipeVolume = _createOptions(Gallon, Liter, Quart);
export const GrainWeight = _createOptions(Pound, Ounce, Kilogram, Gram);
export const BoilOffTime = _createOptions(Hour, Minute);
export const TemperatureOptions = _createOptions(Fahrenheit, Celsius);
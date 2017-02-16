import Units from './Units';

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

const _shortAbbreviations = {
  Gallon: 'gal',
  Quart: 'qt',
  Liter: 'l',
  Pound: 'lbs',
  Ounce: 'oz',
  Kilogram: 'kg',
  Gram: 'g',
  Fahrenheit: '°F',
  Celsius: '°C',
  Hour: 'hr',
  Minute: 'min'
};

function _getOptions(mapping) {
  return function(...options) {
    return options.map((o, i) => ({
      value: o,
      order: i,
      name: mapping[o]
    }));
  }
}

const _options = _getOptions(_displayAbbreviations);
const _shortOptions = _getOptions(_shortAbbreviations);

export default {
  HopAdditionWeight: _options(Units.Ounce, Units.Gram, Units.Pound, Units.Kilogram),
  HopWeightShort: _shortOptions(Units.Ounce, Units.Gram, Units.Pound, Units.Kilogram),
  RecipeVolume: _options(Units.Gallon, Units.Liter, Units.Quart),
  GrainWeight: _options(Units.Pound, Units.Ounce, Units.Kilogram, Units.Gram),
  GrainWeightShort: _shortOptions(Units.Pound, Units.Ounce, Units.Kilogram, Units.Gram),
  MashWeight: _options(Units.Pound, Units.Kilogram),
  BoilOffTime: _options(Units.Hour),
  TemperatureOptions: _options(Units.Fahrenheit, Units.Celsius)
}
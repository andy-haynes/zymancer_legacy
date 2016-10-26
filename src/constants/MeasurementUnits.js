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

function _options(...options) {
  return options.map((o, i) => ({ value: o, order: i, name: _displayAbbreviations[o] }));
}

export default {
  HopAdditionWeight: _options(Units.Ounce, Units.Gram, Units.Pound, Units.Kilogram),
  RecipeVolume: _options(Units.Gallon, Units.Liter, Units.Quart),
  GrainWeight: _options(Units.Pound, Units.Ounce, Units.Kilogram, Units.Gram),
  MashWeight: _options(Units.Pound, Units.Kilogram),
  BoilOffTime: _options(Units.Hour),
  TemperatureOptions: _options(Units.Fahrenheit, Units.Celsius)
}
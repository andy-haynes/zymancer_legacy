import {
  Gallon,
  Quart,
  FluidOunce,
  Cup,
  Liter,
  Milliliter,
  Pound,
  Ounce,
  Kilogram,
  Gram,
  Fahrenheit,
  Celsius,
  Hour,
  Minute
} from '../constants/Units';

const conversionTable = {
/* volume */
  Gallon: {
    Quart:      4,
    FluidOunce: 128,
    Cup:        16,
    Liter:      3.78541,
    Milliliter: 3785.41
  },
  Quart: {
    Gallon:     0.25,
    FluidOunce: 32,
    Cup:        4,
    Liter:      0.946353,
    Milliliter: 946.353
  },
  FluidOunce: {
    Gallon:     0.0078125,
    Quart:      0.03125,
    Cup:        0.123223,
    Liter:      0.0295735,
    Milliliter: 29.5735
  },
  Cup: {
    Gallon:     0.0634013,
    Quart:      0.253605,
    FluidOunce: 8.11537,
    Liter:      0.24,
    Milliliter: 240
  },
  Liter: {
    Gallon:     0.264172,
    Quart:      1.05669,
    FluidOunce: 33.814,
    Cup:        4.16667,
    Milliliter: 1000
  },
  Milliliter: {
    Gallon:     0.000264172,
    Quart:      0.00105669,
    FluidOunce: 0.033814,
    Cup:        0.00416667,
    Liter:      0.001
  },
/* mass */
  Pound: {
    Ounce:    16,
    Kilogram: 0.453592,
    Gram:     453.592
  },
  Ounce: {
    Pound:    0.0625,
    Kilogram: 0.0283495,
    Gram:     28.3495
  },
  Kilogram: {
    Pound:    2.20462,
    Ounce:    35.274,
    Gram:     1000
  },
  Gram: {
    Pound:    0.00220462,
    Ounce:    0.035274,
    Kilogram: 0.001
  },
/* time */
  Hour: {
    Minute: 60
  },
  Minute: {
    Hour: 0.000277778
  }
};

export default conversionTable;
import {
  SetGrainWeight,
  SetBoilVolume,
  SetTargetVolume,
  SetHopAdditionWeight,
  SetGrainAbsorption,
  SetBoilOff,
  SetInfusionTemp,
  SetGrainTemp
} from './RecipeActionTypes';
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

// mash
export const DefaultBoilMinutes = 60;
export const DefaultEfficiencyPercentage = 75;
export const DefaultGrainWeight = { value: 1, unit: Pound };
export const DefaultMashThickness = { value: 1.25, antecedent: Quart, consequent: Pound };
export const DefaultGrainTemp = { value: 68, unit: Fahrenheit };
export const DefaultInfusionTemp = { value: 152, unit: Fahrenheit };
export const DefaultMashoutTemp = { value: 170, unit: Fahrenheit };
export const DefaultGrainAbsorptionLoss = { value: 0.1, antecedent: Gallon, consequent: Pound };
export const DefaultBoilOffRate = { value: 1, antecedent: Gallon, consequent: Hour };

// hops
export const DefaultHopAdditionWeight = { value: 1, unit: Ounce };

// boil
export const DefaultBoilVolume = { value: 4, unit: Gallon };
export const DefaultTargetVolume = { value: 3, unit: Gallon };

// fermentation
export const YeastViabilityMonths = 4.47;
export const DefaultYeastAttenuation = 0.75;
export const DefaultPitchRate = 0.75;
export const DefaultCellCount = Math.pow(10, 11);

// precision
export const MeasurementPrecision = {
  SetGrainWeight: 2,
  SetBoilVolume: 1,
  SetTargetVolume: 1,
  SetHopAdditionWeight: 2,
  SetInfusionTemp: 1,
  SetGrainTemp: 1
};
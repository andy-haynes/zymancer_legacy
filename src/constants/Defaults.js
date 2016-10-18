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
import Units from './Units';

// mash
const BoilMinutes = 60;
const EfficiencyPercentage = 75;
const MaxEfficiencyPercentage = 100;
const MinEfficiencyPercentage = 25;
const GrainWeight = { value: 1, unit: Units.Pound };
const MashThickness = { value: 1.25, antecedent: Units.Quart, consequent: Units.Pound };
const GrainTemp = { value: 68, unit: Units.Fahrenheit };
const InfusionTemp = { value: 152, unit: Units.Fahrenheit };
const MashoutTemp = { value: 170, unit: Units.Fahrenheit };
const GrainAbsorptionLoss = { value: 0.1, antecedent: Units.Gallon, consequent: Units.Pound };
const BoilOffRate = { value: 1, antecedent: Units.Gallon, consequent: Units.Hour };

// hops
const HopAdditionWeight = { value: 1, unit: Units.Ounce };

// boil
const BoilVolume = { value: 7, unit: Units.Gallon };
const TargetVolume = { value: 5.5, unit: Units.Gallon };

// fermentation
const YeastViabilityMonths = 4.47;
const YeastAttenuation = 0.75;
const PitchRate = 0.75;
const CellCount = Math.pow(10, 11);

// precision
const MeasurementPrecision = {
  SetGrainWeight: 2,
  SetBoilVolume: 1,
  SetTargetVolume: 1,
  SetHopAdditionWeight: 2,
  SetInfusionTemp: 1,
  SetGrainTemp: 1
};

export default {
  BoilMinutes,
  EfficiencyPercentage,
  MaxEfficiencyPercentage,
  MinEfficiencyPercentage,
  GrainWeight,
  MashThickness,
  GrainTemp,
  InfusionTemp,
  MashoutTemp,
  GrainAbsorptionLoss,
  BoilOffRate,
  HopAdditionWeight,
  BoilVolume,
  TargetVolume,
  YeastViabilityMonths,
  YeastAttenuation,
  PitchRate,
  CellCount,
  MeasurementPrecision
};
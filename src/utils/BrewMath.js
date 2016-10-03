import SRMColors from '../constants/SRMColors';
import _ from 'lodash';
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
import { roundTo, convertToUnit, monthsSinceDate } from './core';

// gravity
export const gravityToPoints = (gravity) => {
  return !isNaN(gravity) ? (parseFloat(gravity) - 1) * 1000 : 0;
};

export const pointsToGravity = (points) => {
  return !isNaN(points) ? roundTo(1 + (parseInt(points) / 1000), 3) : 1;
};

export const gravityToPlato = (gravity) => {
  return gravityToPoints(gravity) / 4;
};

// grains
export const calculateGrainRGB = (targetVolume, grain) => {
  return SRMtoRGB(calculateSRM(targetVolume, [grain]));
};

export const calculateSRM = (targetVolume, grains) => {
  let mcu = _.sumBy(grains, grain => {
    const lovibond = parseFloat(grain.lovibond);
    return isNaN(lovibond) ? 0 : convertToUnit(grain.weight, Pound) * (lovibond / convertToUnit(targetVolume, Gallon));
  });

  return 1.4922 * Math.pow(mcu, 0.6859);
};

export const SRMtoRGB = (srm) => {
  srm = Math.max(0, Math.min(Math.round(parseFloat(srm)), 40));
  return SRMColors[isNaN(srm) ? 0 : srm];
};

export const calculateGravity = (efficiencyPercentage, grains, targetVolume) => {
  const efficiency = efficiencyPercentage / 100;
  const points = _.sumBy(grains, grain => gravityToPoints(grain.gravity) * convertToUnit(grain.weight, Pound));
  return pointsToGravity((efficiency * points) / convertToUnit(targetVolume, Gallon));
};

/* http://byo.com/mead/item/1544-understanding-malt-spec-sheets-advanced-brewing */
export function DBFGtoGravity(dbfg) {
  return roundTo(1 + ((dbfg / 100) * 0.04621), 3);
}

// hops
export const calculateUtilization = (minutes, gravity) => {
  const fG = 1.65 * Math.pow(0.000125, gravity - 1);
  const fT = (1 - Math.pow(Math.E, -0.04 * minutes)) / 4.15;
  return fG * fT;
};

export const calculateIBU = (weight, minutes, alpha, originalGravity, boilVolume) => {
  const aau = parseFloat(alpha) * convertToUnit(weight, Ounce);
  const utilization = calculateUtilization(minutes, originalGravity);
  return (aau * utilization * 75) / convertToUnit(boilVolume, Gallon);
};

export const calculateTotalUtilization = (additions, originalGravity) => {
  return _.sumBy(additions, addition => calculateUtilization(addition.minutes, originalGravity));
};

export const calculateTotalIBU = (boilVolume, originalGravity, hops) => {
  return _.sumBy(hops, hop => {
    return _.sumBy(hop.additions, addition => calculateIBU(addition.weight, addition.minutes, hop.alpha, originalGravity, boilVolume));
  });
};

// mash
export const convertRatio = (oldRatio, newRatio, precision = undefined) => {
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
    value = roundTo(value, precision);
  }

  return Object.assign({}, newRatio, { value });
};

export const calculateBoilVolume = (targetVolume, boilOffRatio, mashThicknessRatio, absorptionLossRatio, boilMinutes, grainWeight) => {
  const volumeUnit = targetVolume.unit;
  const weightUnit = mashThicknessRatio.consequent;

  const convertedWeight = convertToUnit(grainWeight, weightUnit);
  const convertedAbsorption = convertRatio(absorptionLossRatio, { antecedent: volumeUnit, consequent: weightUnit });
  const convertedBoilOff = convertRatio(boilOffRatio, { antecedent: volumeUnit, consequent: Minute });

  const boilLoss = boilMinutes * convertedBoilOff.value;
  const absorptionLoss = convertedWeight * convertedAbsorption.value;

  return { value: roundTo(parseFloat(targetVolume.value) + boilLoss + absorptionLoss, 1), unit: volumeUnit };
};

export const calculateStrikeVolume = (grainWeight, mashThickness) => {
  const weight = convertToUnit(grainWeight, mashThickness.consequent);
  return { value: roundTo(weight * mashThickness.value, 1), unit: mashThickness.antecedent }
};

export const calculateSpargeVolume = (boilVolume, strikeVolume) => {
  return { value: roundTo(convertToUnit(boilVolume, strikeVolume.unit, 1) - strikeVolume.value, 1), unit: strikeVolume.unit }
};

// TODO: metric
export const calculateStrikeWaterTemp = (mashThickness, sourceTemp, targetTemp) => {
  const source = convertToUnit(sourceTemp, Fahrenheit);
  const target = convertToUnit(targetTemp, Fahrenheit);
  const convertedRatio = convertRatio(mashThickness, { antecedent: Quart, consequent: Pound }).value;
  const deltaT = ((0.2 / convertedRatio) * (target - source)) + target;
  return { value: roundTo(deltaT, 1), unit: Fahrenheit };
};

export const calculateMashoutWaterTemp = (strikeVolume, spargeVolume, grainWeight, infusionTemp, mashoutTemp) => {
  const mashoutF = convertToUnit(mashoutTemp, Fahrenheit);
  const deltaT = mashoutF - convertToUnit(infusionTemp, Fahrenheit);
  const volumeQuotient = (0.2 * convertToUnit(grainWeight, Pound) * convertToUnit(strikeVolume, Quart)) / convertToUnit(spargeVolume, Quart);
  return { value: roundTo((deltaT * volumeQuotient) + mashoutF, 1), unit: Fahrenheit };
};

// yeast
export const calculateFinalGravity = (originalGravity, attenuation) => {
  const ogPoints = gravityToPoints(originalGravity);
  return pointsToGravity(ogPoints - (ogPoints * attenuation));
};

export const calculateABV = (originalGravity, finalGravity) => {
  const pointsDiff = parseFloat(originalGravity) - finalGravity;
  return roundTo(pointsDiff * 131.25, 1);
};

export const calculateYeastViability = (mfgDate) => {
  return roundTo(Math.max(96.2 - (21.5 * monthsSinceDate(mfgDate)), 10), 1);
};

export const calculateCellCount = (startingCount, mfgDate, starterSteps) => {
  return startingCount;
};

export const calculateRecommendedCellCount = (pitchRate, originalGravity, targetVolume) => {
  return Math.pow(10, 6) * pitchRate * convertToUnit(targetVolume, Milliliter) * gravityToPlato(originalGravity);
};
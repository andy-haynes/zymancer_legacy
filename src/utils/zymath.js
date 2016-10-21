import SRMColors from '../constants/SRMColors';
import _ from 'lodash';
import Units from '../constants/Units';
import helpers from './helpers';

// gravity
function formatGravity(gravity) {
  return gravity === 1 ? '1.000' : `${gravity.toString()}000`.substring(0, 5);
}

function gravityToPoints(gravity) {
  return !isNaN(gravity) ? (parseFloat(gravity) - 1) * 1000 : 0;
}

function pointsToGravity(points) {
  return !isNaN(points) ? _.round(1 + (parseInt(points) / 1000), 3) : 1;
}

function gravityToPlato(gravity) {
  return gravityToPoints(gravity) / 4;
}

// grains
function calculateGrainRGB(targetVolume, grain) {
  return SRMtoRGB(calculateSRM(targetVolume, [grain]));
}

function calculateSRM(targetVolume, grains) {
  let mcu = _.sumBy(grains, grain => {
    const lovibond = parseFloat(grain.lovibond);
    return isNaN(lovibond) ? 0 : helpers.convertToUnit(grain.weight, Units.Pound) * (lovibond / helpers.convertToUnit(targetVolume, Units.Gallon));
  });

  return 1.4922 * Math.pow(mcu, 0.6859);
}

function SRMtoRGB(srm) {
  srm = Math.max(0, Math.min(Math.round(parseFloat(srm)), 40));
  return SRMColors[isNaN(srm) ? 0 : srm];
}

function calculateGravity(efficiencyPercentage, grains, targetVolume) {
  const efficiency = efficiencyPercentage / 100;
  const points = _.sumBy(grains, grain => {
    return (grain.isExtract ? 1 : efficiency) * grain.gravity * helpers.convertToUnit(grain.weight, Units.Pound)
  });
  return pointsToGravity(points / helpers.convertToUnit(targetVolume, Units.Gallon));
}

/* http://byo.com/mead/item/1544-understanding-malt-spec-sheets-advanced-brewing */
function DBFGtoGravity(dbfg) {
  return _.round(1 + ((dbfg / 100) * 0.04621), 3);
}

// hops
function calculateUtilization(minutes, gravity) {
  const fG = 1.65 * Math.pow(0.000125, gravity - 1);
  const fT = (1 - Math.pow(Math.E, -0.04 * minutes)) / 4.15;
  return fG * fT;
}

function calculateIBU(weight, minutes, alpha, originalGravity, boilVolume) {
  const aau = parseFloat(alpha) * helpers.convertToUnit(weight, Units.Ounce);
  const utilization = calculateUtilization(minutes, originalGravity);
  return (aau * utilization * 75) / helpers.convertToUnit(boilVolume, Units.Gallon);
}

function calculateTotalUtilization(additions, originalGravity) {
  return _.sumBy(additions, addition => calculateUtilization(addition.minutes, originalGravity));
}

function calculateTotalIBU(boilVolume, originalGravity, hops) {
  return _.sumBy(hops, hop => {
    return _.sumBy(hop.additions, addition => calculateIBU(addition.weight, addition.minutes, hop.alpha, originalGravity, boilVolume));
  });
}

// mash
function calculateBoilVolume(targetVolume, boilOffRatio, mashThicknessRatio, absorptionLossRatio, boilMinutes, grainWeight) {
  const volumeUnit = targetVolume.unit;
  const weightUnit = mashThicknessRatio.consequent;

  const convertedWeight = helpers.convertToUnit(grainWeight, weightUnit);
  const convertedAbsorption = helpers.convertRatio(absorptionLossRatio, { antecedent: volumeUnit, consequent: weightUnit });
  const convertedBoilOff = helpers.convertRatio(boilOffRatio, { antecedent: volumeUnit, consequent: Units.Minute });

  const boilLoss = boilMinutes * convertedBoilOff.value;
  const absorptionLoss = convertedWeight * convertedAbsorption.value;

  return { value: _.round(parseFloat(targetVolume.value) + boilLoss + absorptionLoss, 1), unit: volumeUnit };
}

function calculateStrikeVolume(grainWeight, mashThickness) {
  const weight = helpers.convertToUnit(grainWeight, mashThickness.consequent);
  return { value: _.round(weight * mashThickness.value, 1), unit: mashThickness.antecedent }
}

function calculateSpargeVolume(boilVolume, strikeVolume) {
  return { value: _.round(helpers.convertToUnit(boilVolume, strikeVolume.unit, 1) - strikeVolume.value, 1), unit: strikeVolume.unit }
}

// TODO: metric
function calculateStrikeWaterTemp(mashThickness, sourceTemp, targetTemp) {
  const source = helpers.convertToUnit(sourceTemp, Units.Fahrenheit);
  const target = helpers.convertToUnit(targetTemp, Units.Fahrenheit);
  const convertedRatio = helpers.convertRatio(mashThickness, { antecedent: Units.Quart, consequent: Units.Pound }).value;
  const deltaT = ((0.2 / convertedRatio) * (target - source)) + target;
  return { value: _.round(deltaT, 1), unit: Units.Fahrenheit };
}

function calculateMashoutWaterTemp(strikeVolume, spargeVolume, grainWeight, infusionTemp, mashoutTemp) {
  const mashoutF = helpers.convertToUnit(mashoutTemp, Units.Fahrenheit);
  const deltaT = mashoutF - helpers.convertToUnit(infusionTemp, Units.Fahrenheit);
  const volumeQuotient = (0.2 * helpers.convertToUnit(grainWeight, Units.Pound) * helpers.convertToUnit(strikeVolume, Units.Quart)) / helpers.convertToUnit(spargeVolume, Units.Quart);
  return { value: _.round((deltaT * volumeQuotient) + mashoutF, 1), unit: Units.Fahrenheit };
}

// yeast
function calculateFinalGravity(originalGravity, apparentAttenuation) {
  const ogPoints = gravityToPoints(originalGravity);
  return pointsToGravity(ogPoints - (ogPoints * apparentAttenuation));
}

function calculateABV(originalGravity, finalGravity) {
  const pointsDiff = parseFloat(originalGravity) - finalGravity;
  return _.round(pointsDiff * 131.25, 1);
}

function calculateYeastViability(mfgDate) {
  return _.round(Math.max(96.2 - (21.5 * helpers.monthsSinceDate(mfgDate)), 10), 1);
}

function calculateCellCount(startingCount, mfgDate, starterSteps) {
  return startingCount;
}

function calculateRecommendedCellCount(pitchRate, originalGravity, targetVolume) {
  return Math.pow(10, 6) * pitchRate * helpers.convertToUnit(targetVolume, Units.Milliliter) * gravityToPlato(originalGravity);
}

export default {
  formatGravity,
  gravityToPoints,
  pointsToGravity,
  gravityToPlato,
  calculateGrainRGB,
  calculateSRM,
  SRMtoRGB,
  calculateGravity,
  DBFGtoGravity,
  calculateUtilization,
  calculateIBU,
  calculateTotalUtilization,
  calculateTotalIBU,
  calculateBoilVolume,
  calculateStrikeVolume,
  calculateSpargeVolume,
  calculateStrikeWaterTemp,
  calculateMashoutWaterTemp,
  calculateFinalGravity,
  calculateABV,
  calculateYeastViability,
  calculateCellCount,
  calculateRecommendedCellCount
};
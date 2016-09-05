//region imports
import {
// hops
  AddHop,
  RemoveHop,
  SetHopAlpha,
  SetHopBeta,
  AddHopAddition,
  RemoveHopAddition,
  SetHopAdditionTime,
  SetHopAdditionWeight,
  FilterHops,
  ClearHopSearch,
// grains
  FilterGrains,
  ClearGrainSearch,
  AddGrain,
  RemoveGrain,
  SetGrainWeight,
  SetGrainGravity,
  SetGrainLovibond,
// recipe
  ImportRecipe,
  SetRecipeName,
  SetBoilTime,
  SetBoilVolume,
  SetTargetVolume,
  SetEfficiency,
// mash
  SetMashThickness,
  SetBoilOff,
  SetGrainAbsorption,
  SetInfusionTemp,
  SetMashoutTemp,
  SetGrainTemp,
// fermentation
  SetPitchRate,
  AddYeast,
  RemoveYeast,
  SetYeastMfgDate,
  SetYeastAttenuation,
  SetYeastViability,
  SetYeastQuantity,
  AddStarterStep,
  RemoveStarterStep,
  FilterYeast,
  ClearYeastSearch
} from '../constants/RecipeActionTypes';
import {
  calculateGravity,
  calculateTotalIBU,
  calculateBoilVolume,
  calculateStrikeVolume,
  calculateSpargeVolume,
  calculateVolumeDiff,
  calculateStrikeWaterTemp,
  calculateRecommendedCellCount,
  calculateABV,
  calculateFinalGravity,
  calculateMashoutWaterTemp
} from '../utils/BrewMath';
import { convertToUnit } from '../utils/core';
import {
  DefaultBoilVolume,
  DefaultTargetVolume,
  DefaultBoilMinutes,
  DefaultEfficiencyPercentage,
  DefaultYeastAttenuation
} from '../constants/Defaults';
import grain from './grain';
import hop from './hop';
import fermentation from './fermentation';
import yeastSearch from './yeastSearch';
import grainSearch from './grainSearch';
import mashSchedule from './mashSchedule';
import hopSearch from './hopSearch';
import measurement from './measurement';
import _ from 'lodash'
//endregion

const initialState = {
  recipeName: 'My Awesome Mixed Beer #6',
  originalGravity: 1.0,
  finalGravity: 1.0,
  IBU: 0,
  ABV: 0,
  targetVolume: DefaultTargetVolume,
  boilVolume: DefaultBoilVolume,
  boilMinutes: DefaultBoilMinutes,
  efficiency: DefaultEfficiencyPercentage,
  grains: [],
  grainSearch: grainSearch(undefined, {}),
  hops: [],
  hopSearch: hopSearch(undefined, {}),
  mashSchedule: mashSchedule(undefined, {}),
  fermentation: fermentation(undefined, {}),
  yeastSearch: yeastSearch(undefined, {})
};

const recalculate = (state, changed) => {
  let grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV;
  ({  grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV } = Object.assign({}, state, changed));

  const thicknessUnit = mashSchedule.thickness.consequent;
  const grainWeight = { value: _.sumBy(grains, g => convertToUnit(g.weight, thicknessUnit)), unit: thicknessUnit };
  boilVolume = calculateBoilVolume(targetVolume, mashSchedule.boilOff, mashSchedule.thickness, mashSchedule.absorption, boilMinutes, grainWeight);

  mashSchedule.strikeVolume = calculateStrikeVolume(grainWeight, mashSchedule.thickness);
  mashSchedule.spargeVolume = calculateSpargeVolume(boilVolume, mashSchedule.strikeVolume);
  mashSchedule.strikeTemp = calculateStrikeWaterTemp(mashSchedule.thickness, mashSchedule.grainTemp, mashSchedule.infusionTemp);
  mashSchedule.spargeTemp = calculateMashoutWaterTemp(mashSchedule.strikeVolume, mashSchedule.spargeVolume, grainWeight, mashSchedule.infusionTemp, mashSchedule.mashoutTemp);

  originalGravity = calculateGravity(efficiency, grains, targetVolume);
  IBU = calculateTotalIBU(boilVolume, originalGravity, hops);

  fermentation.recommendedCellCount = calculateRecommendedCellCount(fermentation.pitchRate, originalGravity, targetVolume);
  const attenuation = (_.sumBy(fermentation.yeasts, yeast => yeast.attenuation / 100) / fermentation.yeasts.length) || DefaultYeastAttenuation;
  finalGravity = calculateFinalGravity(originalGravity, attenuation);
  ABV = calculateABV(originalGravity, finalGravity);

  return { grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV };
};

const recipe = (state = initialState, action) => {
  const updateRecipe = (changed) => Object.assign({}, state, recalculate(state, changed));

  switch (action.type) {
    case ImportRecipe:
      return updateRecipe(action.recipe);
    case SetRecipeName:
      return Object.assign({}, state, { recipeName: action.name });
    case SetTargetVolume:
      return updateRecipe({ targetVolume: measurement(state.targetVolume, action) });
    case SetBoilVolume:
      return updateRecipe({ boilVolume: measurement(state.boilVolume, action) });
    case SetEfficiency:
      return updateRecipe({ efficiency: action.efficiency });
    case AddHop:
      return updateRecipe({ hops: state.hops.concat(hop(undefined, action)) });
    case RemoveHop:
      return updateRecipe({ hops: state.hops.filter(h => h.id !== action.hop.id) });
    case SetHopAlpha:
    case SetHopBeta:
    case AddHopAddition:
    case RemoveHopAddition:
    case SetHopAdditionTime:
    case SetHopAdditionWeight:
      return updateRecipe({ hops: state.hops.map(h => h.id === action.hop.id ? hop(h, action) : h) });
    case AddGrain:
      return updateRecipe({ grains: state.grains.concat(grain(undefined, action)) });
    case RemoveGrain:
      return updateRecipe({ grains: state.grains.filter(g => g.id !== action.grain.id) });
    case SetGrainWeight:
    case SetGrainGravity:
    case SetGrainLovibond:
      return updateRecipe({ grains: state.grains.map(g => g.id === action.grain.id ? grain(g, action) : g) });
    case FilterHops:
    case ClearHopSearch:
      return Object.assign({}, state, { hopSearch: hopSearch(action.query, action) });
    case FilterGrains:
    case ClearGrainSearch:
      return Object.assign({}, state, { grainSearch: grainSearch(state.grainSearch, action) });
    case SetMashThickness:
    case SetBoilOff:
    case SetGrainAbsorption:
    case SetInfusionTemp:
    case SetMashoutTemp:
    case SetGrainTemp:
      return updateRecipe({ mashSchedule: mashSchedule(state.mashSchedule, action) });
    case SetPitchRate:
    case AddYeast:
    case RemoveYeast:
    case SetYeastMfgDate:
    case SetYeastAttenuation:
    case SetYeastViability:
    case SetYeastQuantity:
    case AddStarterStep:
    case RemoveStarterStep:
      return updateRecipe({ fermentation: fermentation(state.fermentation, action) });
    case FilterYeast:
    case ClearYeastSearch:
      return Object.assign({}, state, { yeastSearch: yeastSearch(state.yeastSearch, action) });
    default:
      return state;
  }
};

export default recipe;
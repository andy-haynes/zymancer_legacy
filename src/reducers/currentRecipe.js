import RecipeActions from '../constants/RecipeActionTypes';
import zymath from '../utils/zymath';
import helpers from '../utils/helpers';
import Defaults from '../constants/Defaults';
import { BrewMethod, MashMethod } from '../constants/AppConstants';
import grain from './grain';
import hop from './hop';
import fermentation from './fermentation';
import mashSchedule from './mashSchedule';
import measurement from './measurement';
import sumBy from 'lodash/sumBy'

const initialState = {
  id: null,
  name: 'My Awesome Mixed Beer #6',
  style: 'American Pale Ale',
  method: BrewMethod.AllGrain,
  loaded: false,
  originalGravity: 1.0,
  finalGravity: 1.0,
  IBU: 0,
  ABV: 0,
  SRM: 0,
  targetVolume: Defaults.TargetVolume,
  boilVolume: Defaults.BoilVolume,
  boilMinutes: Defaults.BoilMinutes,
  efficiency: Defaults.EfficiencyPercentage,
  grains: [],
  hops: [],
  mashSchedule: mashSchedule(undefined, {}),
  fermentation: fermentation(undefined, {})
};

function calculateMashSchedule(mashSchedule, grains, grainWeight, efficiency, boilVolume) {
  switch (mashSchedule.style) {
    case MashMethod.SingleInfusion:
      mashSchedule.strikeVolume = zymath.calculateStrikeVolume(grainWeight, mashSchedule.thickness);
      mashSchedule.spargeVolume = zymath.calculateSpargeVolume(boilVolume, mashSchedule.strikeVolume);
      mashSchedule.strikeTemp = zymath.calculateStrikeWaterTemp(mashSchedule.thickness, mashSchedule.grainTemp, mashSchedule.infusionTemp);
      mashSchedule.spargeTemp = zymath.calculateMashoutWaterTemp(mashSchedule.strikeVolume, mashSchedule.spargeVolume, grainWeight, mashSchedule.infusionTemp, mashSchedule.mashoutTemp);
      break;
    case MashMethod.BIAB:
      const biabThickness = helpers.createRatio(boilVolume, grainWeight);
      mashSchedule.strikeTemp = zymath.calculateStrikeWaterTemp(biabThickness, mashSchedule.grainTemp, mashSchedule.infusionTemp);
      mashSchedule.strikeVolume = helpers.convertToUnit(boilVolume, mashSchedule.strikeVolume.unit, 1);
      break;
    case MashMethod.MultipleRest:
    case MashMethod.Decoction:
      break;
  }

  return mashSchedule;
}

function recalculate(state, changed) {
  let { id, name, style, method, grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV, SRM } = Object.assign({}, state, changed);

  const thicknessUnit = mashSchedule.thickness.consequent;
  const grainWeight = {
    value: sumBy(grains, g => helpers.convertToUnit(g.weight, thicknessUnit).value),
    unit: thicknessUnit
  };
  boilVolume = zymath.calculateBoilVolume(targetVolume, mashSchedule.boilOff, mashSchedule.thickness, mashSchedule.absorption, boilMinutes, grainWeight);

  switch (method) {
    case BrewMethod.AllGrain:
    case BrewMethod.PartialMash:
      originalGravity = zymath.calculateGravity(efficiency, grains, targetVolume);
      mashSchedule = calculateMashSchedule(Object.assign({}, mashSchedule), grains, grainWeight, efficiency, boilVolume);
      break;
    case BrewMethod.Extract:
      originalGravity = zymath.calculateGravity(100, grains.filter(g => g.isExtract), targetVolume);
      break;
  }

  IBU = zymath.calculateTotalIBU(boilVolume, originalGravity, hops);

  fermentation = Object.assign({}, fermentation, {
    cellCount: sumBy(fermentation.yeasts, y => zymath.calculateCellCount(Defaults.CellCount * y.quantity, y.mfgDate, y.starterSteps)) || 0,
    recommendedCellCount: zymath.calculateRecommendedCellCount(fermentation.pitchRate, originalGravity, targetVolume)
  });
  const apparentAttenuation = (sumBy(fermentation.yeasts, yeast => yeast.apparentAttenuation / 100) / fermentation.yeasts.length) || Defaults.YeastAttenuation;
  finalGravity = zymath.calculateFinalGravity(originalGravity, apparentAttenuation);
  ABV = zymath.calculateABV(originalGravity, finalGravity);
  SRM = zymath.calculateSRM(targetVolume, grains);

  return { id, name, style, method, grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV, SRM };
}

const currentRecipe = (state = initialState, action) => {
  const updateRecipe = (changed, refresh = true) => Object.assign(
    {},
    state,
    refresh ? recalculate(state, changed) : changed,
    { loaded: true }
  );

  switch (action.type) {
    case RecipeActions.LoadSavedRecipe:
      return updateRecipe(action.recipe);
    case RecipeActions.SetRecipeName:
      return updateRecipe({ name: action.name }, false);
    case RecipeActions.SetRecipeStyle:
      return updateRecipe({ style: action.style }, false);
    case RecipeActions.SetRecipeMethod:
      return updateRecipe({ method: action.method });
    case RecipeActions.SetTargetVolume:
      return updateRecipe({ targetVolume: measurement(state.targetVolume, action) });
    case RecipeActions.SetBoilVolume:
      return updateRecipe({ boilVolume: measurement(state.boilVolume, action) });
    case RecipeActions.SetEfficiency:
      return updateRecipe({ efficiency: action.efficiency });
    case RecipeActions.AddHop:
      return updateRecipe({ hops: state.hops.concat(hop(undefined, action)) });
    case RecipeActions.RemoveHop:
      return updateRecipe({ hops: state.hops.filter(h => h.id !== action.hop.id) });
    case RecipeActions.SetHopAlpha:
    case RecipeActions.SetHopBeta:
    case RecipeActions.AddHopAddition:
    case RecipeActions.RemoveHopAddition:
    case RecipeActions.SetHopAdditionTime:
    case RecipeActions.SetHopAdditionWeight:
      return updateRecipe({ hops: state.hops.map(h => h.id === action.hop.id ? hop(h, action) : h) });
    case RecipeActions.AddGrain:
      return updateRecipe({ grains: state.grains.concat(grain(undefined, action)) });
    case RecipeActions.RemoveGrain:
      return updateRecipe({ grains: state.grains.filter(g => g.id !== action.grain.id) });
    case RecipeActions.SetGrainWeight:
    case RecipeActions.SetGrainGravity:
    case RecipeActions.SetGrainLovibond:
    case RecipeActions.SetGrainLintner:
    case RecipeActions.SetGrainExtractType:
      return updateRecipe({ grains: state.grains.map(g => g.id === action.grain.id ? grain(g, action) : g) });
    case RecipeActions.SetMashStyle:
    case RecipeActions.SetMashThickness:
    case RecipeActions.SetBoilOff:
    case RecipeActions.SetGrainAbsorption:
    case RecipeActions.SetInfusionTemp:
    case RecipeActions.SetMashoutTemp:
    case RecipeActions.SetGrainTemp:
      return updateRecipe({ mashSchedule: mashSchedule(state.mashSchedule, action) });
    case RecipeActions.SetPitchRate:
    case RecipeActions.AddYeast:
    case RecipeActions.RemoveYeast:
    case RecipeActions.SetYeastMfgDate:
    case RecipeActions.SetYeastAttenuation:
    case RecipeActions.SetYeastViability:
    case RecipeActions.SetYeastQuantity:
    case RecipeActions.AddStarterStep:
    case RecipeActions.RemoveStarterStep:
      return updateRecipe({ fermentation: fermentation(state.fermentation, action) });
    default:
      return state;
  }
};

export default currentRecipe;
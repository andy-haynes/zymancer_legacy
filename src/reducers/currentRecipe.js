import RecipeActions from '../constants/RecipeActionTypes';
import zymath from '../utils/zymath';
import helpers from '../utils/helpers';
import Defaults from '../constants/Defaults';
import grain from './grain';
import hop from './hop';
import fermentation from './fermentation';
import mashSchedule from './mashSchedule';
import measurement from './measurement';
import _ from 'lodash'

const initialState = {
  name: 'My Awesome Mixed Beer #6',
  style: 'American Pale Ale',
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

function recalculate(state, changed) {
  let { name, style, grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV, SRM } = Object.assign({}, state, changed);

  const thicknessUnit = mashSchedule.thickness.consequent;
  const grainWeight = { value: _.sumBy(grains, g => helpers.convertToUnit(g.weight, thicknessUnit)), unit: thicknessUnit };
  boilVolume = zymath.calculateBoilVolume(targetVolume, mashSchedule.boilOff, mashSchedule.thickness, mashSchedule.absorption, boilMinutes, grainWeight);

  mashSchedule.strikeVolume = zymath.calculateStrikeVolume(grainWeight, mashSchedule.thickness);
  mashSchedule.spargeVolume = zymath.calculateSpargeVolume(boilVolume, mashSchedule.strikeVolume);
  mashSchedule.strikeTemp = zymath.calculateStrikeWaterTemp(mashSchedule.thickness, mashSchedule.grainTemp, mashSchedule.infusionTemp);
  mashSchedule.spargeTemp = zymath.calculateMashoutWaterTemp(mashSchedule.strikeVolume, mashSchedule.spargeVolume, grainWeight, mashSchedule.infusionTemp, mashSchedule.mashoutTemp);

  originalGravity = zymath.calculateGravity(efficiency, grains, targetVolume);
  IBU = zymath.calculateTotalIBU(boilVolume, originalGravity, hops);

  fermentation.recommendedCellCount = zymath.calculateRecommendedCellCount(fermentation.pitchRate, originalGravity, targetVolume);
  const apparentAttenuation = (_.sumBy(fermentation.yeasts, yeast => yeast.apparentAttenuation / 100) / fermentation.yeasts.length) || Defaults.YeastAttenuation;
  finalGravity = zymath.calculateFinalGravity(originalGravity, apparentAttenuation);
  ABV = zymath.calculateABV(originalGravity, finalGravity);
  SRM = zymath.calculateSRM(targetVolume, grains);

  return { name, style, grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV, SRM };
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
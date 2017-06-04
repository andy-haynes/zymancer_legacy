import RecipeActions from '../constants/RecipeActionTypes';
import zymath from '../utils/zymath';
import helpers from '../utils/helpers';
import parseRecipe from '../utils/parseRecipe';
import Defaults from '../constants/Defaults';
import Units from '../constants/Units';
import { BrewMethod, MashMethod, MobileRecipeTab } from '../constants/AppConstants';
import grain from './grain';
import hop from './hop';
import fermentation from './fermentation';
import mashSchedule from './mashSchedule';
import style from './style';
import measurement from './measurement';
import sumBy from 'lodash/sumBy'

const initialState = {
  id: null,
  name: 'My Awesome Mixed Beer #6',
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
  fermentation: fermentation(undefined, {}),
  mobileTab: MobileRecipeTab.Root
};

function calculateMashSchedule(mashSchedule, grains, grainWeight, efficiency, boilVolume) {
  switch (mashSchedule.style) {
    case MashMethod.SingleInfusion:
      mashSchedule.strikeVolume = zymath.calculateStrikeVolume(grainWeight, mashSchedule.thickness);
      mashSchedule.spargeVolume = zymath.calculateSpargeVolume(boilVolume, mashSchedule.strikeVolume);
      mashSchedule.strikeTemp = zymath.calculateStrikeWaterTemp(mashSchedule.thickness, mashSchedule.grainTemp, mashSchedule.infusionTemp);
      //mashSchedule.spargeTemp = zymath.calculateMashoutWaterTemp(mashSchedule.strikeVolume, mashSchedule.spargeVolume, grainWeight, mashSchedule.infusionTemp, mashSchedule.mashoutTemp);
      break;
    case MashMethod.BIAB:
      const biabThickness = helpers.createRatio(boilVolume, grainWeight);
      mashSchedule.strikeTemp = zymath.calculateStrikeWaterTemp(biabThickness, mashSchedule.grainTemp, mashSchedule.infusionTemp);
      mashSchedule.strikeVolume = helpers.convertToUnit(boilVolume, mashSchedule.strikeVolume.unit, 1);
      break;
    //case MashMethod.MultipleRest:
    //case MashMethod.Decoction:
  }

  return mashSchedule;
}

function recalculate(state, changed) {
  let { id, name, style, method, grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV, SRM } = Object.assign({}, state, changed);

  const diff = {
    style: state.style !== style,
    method: state.method !== method,
    grains: state.grains !== grains,
    hops: state.hops !== hops,
    efficiency: state.efficiency !== efficiency,
    targetVolume: state.targetVolume !== targetVolume,
    boilVolume: state.boilVolume !== boilVolume,
    boilMinutes: state.boilMinutes !== boilMinutes,
    mashSchedule: state.mashSchedule !== mashSchedule,
    originalGravity: state.originalGravity !== originalGravity,
    finalGravity: state.finalGravity !== finalGravity,
    IBU: state.IBU !== IBU,
    fermentation: state.fermentation !== fermentation,
    ABV: state.ABV !== ABV,
    SRM: state.SRM !== SRM
  };

  let grainWeight = Object.assign({}, Defaults.GrainWeight, { value: 0 });
  if (grains.length) {
    grainWeight = helpers.sumMeasurements(2, ...grains.map(g => g.weight));
  }

  if (diff.targetVolume || diff.mashSchedule || diff.boilMinutes || diff.grains) {
    boilVolume = zymath.calculateBoilVolume(targetVolume, mashSchedule.boilOff, mashSchedule.thickness, mashSchedule.absorption, boilMinutes, grainWeight);
    mashSchedule.boilLoss = helpers.multiplyRatioByMeasurement(mashSchedule.boilOff, { value: boilMinutes, unit: Units.Minute }, 2);
  }

  if (diff.method || diff.efficiency || diff.grains || diff.targetVolume || diff.boilVolume || diff.mashSchedule) {
    switch (method) {
      case BrewMethod.AllGrain:
      case BrewMethod.PartialMash:
        originalGravity = zymath.calculateGravity(efficiency, grains, targetVolume);
        mashSchedule = calculateMashSchedule(Object.assign({}, mashSchedule), grains, grainWeight, efficiency, boilVolume);
        mashSchedule.absorptionLoss = helpers.multiplyRatioByMeasurement(mashSchedule.absorption, grainWeight, 2);
        break;
      case BrewMethod.Extract:
        originalGravity = zymath.calculateGravity(100, grains.filter(g => g.isExtract), targetVolume);
        break;
    }
  }

  if (diff.mashSchedule || method !== BrewMethod.Extract) {
    mashSchedule.totalLoss = helpers.sumMeasurements(2, mashSchedule.boilLoss, mashSchedule.absorptionLoss);
  }

  if (diff.boilVolume || diff.originalGravity || diff.hops || diff.grains || diff.targetVolume) {
    IBU = zymath.calculateTotalIBU(boilVolume, originalGravity, hops);
  }

  if (diff.fermentation || diff.grains || diff.originalGravity || diff.targetVolume) {
    fermentation = Object.assign({}, fermentation, {
      cellCount: sumBy(fermentation.yeasts, y => zymath.calculateCellCount(Defaults.CellCount * y.quantity, y.mfgDate, y.starterSteps)) || 0,
      recommendedCellCount: zymath.calculateRecommendedCellCount(fermentation.pitchRate, originalGravity, targetVolume)
    });

    const apparentAttenuation = (sumBy(fermentation.yeasts, yeast => yeast.apparentAttenuation / 100) / fermentation.yeasts.length) || Defaults.YeastAttenuation;
    finalGravity = zymath.calculateFinalGravity(originalGravity, apparentAttenuation);
    ABV = zymath.calculateABV(originalGravity, finalGravity);
  }
  
  if (diff.grains || diff.targetVolume) {
    SRM = zymath.calculateSRM(targetVolume, grains);    
  }

  return {
    id,
    name,
    style,
    method,
    IBU,
    ABV,
    SRM,
    efficiency,
    grains: state.grains === grains ? state.grains : grains,
    hops: state.hops === hops ? state.hops : hops,
    targetVolume: state.targetVolume === targetVolume ? state.targetVolume : targetVolume,
    boilVolume: state.boilVolume === boilVolume ? state.boilVolume : boilVolume,
    boilMinutes: state.boilMinutes === boilMinutes ? state.boilMinutes : boilMinutes,
    mashSchedule: state.mashSchedule === mashSchedule ? state.mashSchedule : mashSchedule,
    originalGravity: state.originalGravity === originalGravity ? state.originalGravity : originalGravity,
    finalGravity: state.finalGravity === finalGravity ? state.finalGravity : finalGravity,
    fermentation: state.fermentation === fermentation ? state.fermentation : fermentation
  };
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
    case RecipeActions.SetBoilTime:
      return updateRecipe({
        boilMinutes: action.minutes,
        hops: state.hops.map(h => hop(h, action))
      });
    case RecipeActions.SetTargetVolume:
      return updateRecipe({ targetVolume: measurement(state.targetVolume, action) });
    case RecipeActions.SetBoilVolume:
      return updateRecipe({ boilVolume: measurement(state.boilVolume, action) });
    case RecipeActions.SetEfficiency:
      return updateRecipe({ efficiency: action.efficiency });
    case RecipeActions.ClearRecipe:
      return Object.assign({}, state, initialState);
    case RecipeActions.AddHop:
      return updateRecipe({ hops: state.hops.concat(hop(undefined, action)) });
    case RecipeActions.RemoveHop:
      return updateRecipe({ hops: state.hops.filter(h => h.id !== action.hop.id) });
    case RecipeActions.SetHopAlpha:
    case RecipeActions.SetHopBeta:
    case RecipeActions.SetHopForm:
    case RecipeActions.AddHopAddition:
    case RecipeActions.RemoveHopAddition:
    case RecipeActions.SetHopAdditionType:
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
    case RecipeActions.SelectMobileTab:
      return Object.assign({}, state, {
        mobileTab: action.tab
      });
    default:
      // randomize the style on load
      return Object.assign({}, state, {
        style: style(state.style, action)
      });
  }
};

export default currentRecipe;
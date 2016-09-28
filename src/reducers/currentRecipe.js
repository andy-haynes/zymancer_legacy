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
// grains
  AddGrain,
  RemoveGrain,
  SetGrainWeight,
  SetGrainGravity,
  SetGrainLovibond,
// recipe
  ImportRecipe,
  SetRecipeName,
  SetRecipeStyle,
  SetBoilTime,
  SetBoilVolume,
  SetTargetVolume,
  SetEfficiency,
// mash
  SetMashStyle,
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
  RemoveStarterStep
} from '../constants/RecipeActionTypes';//region imports
import {
  FilterHopResults,
  ClearHopSearch,
  FilterYeastResults,
  ClearYeastSearch
} from '../constants/SearchActionTypes';
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
import { convertToUnit, jsonToGraphql, roundTo } from '../utils/core';
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
import mashSchedule from './mashSchedule';
import measurement from './measurement';
import _ from 'lodash'
//endregion

const initialState = {
  name: 'My Awesome Mixed Beer #6',
  style: 'American Pale Ale',
  originalGravity: 1.0,
  finalGravity: 1.0,
  IBU: 0,
  ABV: 0,
  targetVolume: DefaultTargetVolume,
  boilVolume: DefaultBoilVolume,
  boilMinutes: DefaultBoilMinutes,
  efficiency: DefaultEfficiencyPercentage,
  grains: [],
  hops: [],
  mashSchedule: mashSchedule(undefined, {}),
  fermentation: fermentation(undefined, {})
};

function exportToGraphql() {
  const grains = this.grains.map(g => jsonToGraphql(_.pick(g, 'id', 'weight', 'lovibond', 'gravity')));
  const hops = this.hops.map(h => h.additions.map(a => jsonToGraphql(Object.assign(
    _.pick(a, 'alpha', 'beta', 'minutes', 'weight'),
    { id: a.hop.id }
  )))).reduce((prev, next) => prev.concat(next), []);

  const yeast = this.fermentation.yeasts.map(y => jsonToGraphql(Object.assign(_.pick(y, 'id', 'quantity'), {
    mfgDate: y.mfgDate.toString(),
    attenuation: roundTo(y.attenuation / 100, 2)
  })));

  const mashSchedule = jsonToGraphql(
    _.pick(this.mashSchedule, 'style', 'thickness', 'absorption', 'boilOff', 'grainTemp', 'infusionTemp', 'mashoutTemp')
  );

  const fermentation = jsonToGraphql({
    pitchRateMillionsMLP: this.fermentation.pitchRate
  });

  return `{
    saveRecipe(
      name:"${this.name}",
      style:"${this.style}",
      ABV:${roundTo(parseFloat(this.ABV), 2)},
      IBU:${roundTo(parseFloat(this.IBU), 2)},
      OG:${parseFloat(this.originalGravity)},
      FG:${parseFloat(this.finalGravity)},
      grains:[${grains.join(',')}],
      hops:[${hops.join(',')}],
      yeast:[${yeast.join(',')}],
      mashSchedule:${mashSchedule},
      fermentation:${fermentation}
    ) { id }
  }`;
}

function recalculate(state, changed) {
  let { grains, hops, efficiency, targetVolume, boilVolume, boilMinutes, mashSchedule, originalGravity, finalGravity, IBU, fermentation, ABV } = Object.assign({}, state, changed);

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
}

const recipe = (state = initialState, action) => {
  const updateRecipe = (changed, refresh = true) => {
    let r = Object.assign({}, state, refresh ? recalculate(state, changed) : changed);
    r.exportToGraphql = exportToGraphql.bind(r);
    return r;
  };

  switch (action.type) {
    case ImportRecipe:
      return Object.assign({}, updateRecipe(action.recipe), {
        name: action.recipe.name,
        style: action.recipe.style
      });
    case SetRecipeName:
      return updateRecipe({ name: action.name }, false);
    case SetRecipeStyle:
      return updateRecipe({ style: action.style }, false);
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
    case SetMashStyle:
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
    default:
      return state;
  }
};

recipe.buildLoadRecipeQuery = function(recipeId) {
  return `{
    loadRecipe(id:${recipeId}) {
      id,
      name,
      style,
      grains {
        id,
        name,
        gravity,
        lovibond,
        weight {
          value,
          unit
        }
      },
      hops {
        id,
        name,
        alpha,
        beta,
        categories,
        minutes,
        weight {
          value,
          unit
        }
      },
      yeast {
        id,
        name,
        mfg,
        code,
        description,
        tolerance,
        rangeF,
        rangeC,
        mfgDate,
        attenuation,
        quantity
      },
      fermentation {
        pitchRateMillionsMLP
      },
      mashSchedule {
        style,
        thickness { value, antecedent, consequent },
        absorption { value, antecedent, consequent },
        boilOff { value, antecedent, consequent },
        grainTemp { value, unit },
        infusionTemp { value, unit },
        mashoutTemp { value, unit },
      }
    }
  }`;
};

export default recipe;
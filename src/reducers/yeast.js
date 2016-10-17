import {
  AddYeast,
  SetYeastMfgDate,
  SetYeastAttenuation,
  SetYeastViability,
  SetYeastQuantity,
  AddStarterStep,
  RemoveStarterStep
} from '../constants/RecipeActionTypes';
import { DefaultGrainWeight } from '../constants/Defaults';
import { calculateYeastViability } from '../utils/BrewMath';
import { extractRange } from '../utils/core';
import measurement from './measurement';

function createYeast(yeast) {
  const now = new Date();
  const mfgDate = typeof yeast.mfgDate === 'string' ? new Date(yeast.mfgDate) : new Date(now.getFullYear(), now.getMonth(), -7);
  const attenuationRange = typeof yeast.attenuationRange === 'string' ? extractRange(yeast.attenuationRange) : yeast.attenuationRange;
  const apparentAttenuation = yeast.apparentAttenuation || attenuationRange.avg;
  const rangeF = typeof yeast.rangeF === 'string' ? extractRange(yeast.rangeF) : yeast.rangeF;
  const rangeC = typeof yeast.rangeC === 'string' ? extractRange(yeast.rangeC) : yeast.rangeC;
  return {
    id: yeast.id,
    name: yeast.name,
    code: yeast.code,
    mfg: yeast.mfg,
    mfgDate,
    url: yeast.url,
    description: yeast.description,
    quantity: 1,
    viability: calculateYeastViability(mfgDate),
    flocculation: yeast.flocculation,
    tolerance: yeast.tolerance,
    styles: typeof yeast.styles === 'string' ? yeast.styles.split(',').join(', ') : [],
    starterSteps: [],
    apparentAttenuation,
    attenuationRange,
    rangeF,
    rangeC
  };
}

function yeast(state = {}, action) {
  switch (action.type) {
    case AddYeast:
      return createYeast(action.yeast);
    case SetYeastMfgDate:
      return Object.assign({}, state, {
        mfgDate: action.date,
        viability: calculateYeastViability(action.date)
      });
    case SetYeastViability:
      return Object.assign({}, state, {
        viability: action.viability
      });
    case SetYeastAttenuation:
      return Object.assign({}, state, {
        apparentAttenuation: action.attenuation
      });
    case SetYeastQuantity:
      return Object.assign({}, state, {
        quantity: action.quantity
      });
    case AddStarterStep:
    case RemoveStarterStep:
    default:
      return state;
  }
}

yeast.create = createYeast;

export default yeast;
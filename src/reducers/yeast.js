import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import helpers from '../utils/helpers';
import zymath from '../utils/zymath';
import measurement from './measurement';

function createYeast(yeast) {
  const now = new Date();
  const mfgDate = typeof yeast.mfgDate === 'string' ? new Date(yeast.mfgDate) : new Date(now.getFullYear(), now.getMonth(), -7);
  const attenuationRange = typeof yeast.attenuationRange === 'string' ? helpers.extractRange(yeast.attenuationRange) : yeast.attenuationRange;
  const apparentAttenuation = yeast.apparentAttenuation || attenuationRange.avg;
  const rangeF = typeof yeast.rangeF === 'string' ? helpers.extractRange(yeast.rangeF) : yeast.rangeF;
  const rangeC = typeof yeast.rangeC === 'string' ? helpers.extractRange(yeast.rangeC) : yeast.rangeC;
  return {
    id: yeast.id,
    name: yeast.name,
    code: yeast.code,
    mfg: yeast.mfg,
    mfgDate,
    url: yeast.url,
    description: yeast.description,
    quantity: 1,
    viability: zymath.calculateYeastViability(mfgDate),
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
    case RecipeActions.AddYeast:
      return createYeast(action.yeast);
    case RecipeActions.SetYeastMfgDate:
      return Object.assign({}, state, {
        mfgDate: action.date,
        viability: zymath.calculateYeastViability(action.date)
      });
    case RecipeActions.SetYeastViability:
      return Object.assign({}, state, {
        viability: action.viability
      });
    case RecipeActions.SetYeastAttenuation:
      return Object.assign({}, state, {
        apparentAttenuation: action.attenuation
      });
    case RecipeActions.SetYeastQuantity:
      return Object.assign({}, state, {
        quantity: action.quantity
      });
    case RecipeActions.AddStarterStep:
    case RecipeActions.RemoveStarterStep:
    default:
      return state;
  }
}

yeast.create = createYeast;

export default yeast;
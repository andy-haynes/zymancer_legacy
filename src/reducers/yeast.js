import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import helpers from '../utils/helpers';
import zymath from '../utils/zymath';
import measurement from './measurement';
import pick from 'lodash/pick';

function createYeast(yeast) {
  const now = new Date();
  const mfgDate = typeof yeast.mfgDate === 'string' ? new Date(yeast.mfgDate) : new Date(now.getFullYear(), now.getMonth(), -7);
  const avgAttenuation = (yeast.attenuationLow && yeast.attenuationHigh ? (yeast.attenuationLow + yeast.attenuationHigh) / 2 : yeast.attenuationLow) || null;
  const apparentAttenuation = (yeast.apparentAttenuation * (yeast.apparentAttenuation < 1 ? 100 : 1)) || avgAttenuation;

  return Object.assign(
    pick(yeast, 'id', 'name', 'code', 'url', 'mfg', 'description', 'flocculation', 'toleranceLow', 'toleranceHigh', 'attenuationLow', 'attenuationHigh', 'temperatureLow', 'temperatureHigh'),
    {
      mfgDate,
      quantity: 1,
      viability: zymath.calculateYeastViability(mfgDate),
      styles: typeof yeast.styles === 'string' ? yeast.styles.split(',').join(', ') : [],
      matchScore: yeast.score || 0,
      apparentAttenuation,
      starterSteps: []
    });
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
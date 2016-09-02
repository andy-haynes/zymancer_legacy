import {
  AddYeast,
  RemoveYeast,
  SetYeastMfgDate,
  SetYeastAttenuation,
  SetYeastViability,
  AddStarterStep,
  RemoveStarterStep,
  SetPitchRate
} from '../constants/RecipeActionTypes';
import {
  DefaultPitchRate,
  DefaultCellCount
} from '../constants/Defaults';
import { calculateABV } from '../utils/BrewMath';
import yeast from './yeast';

const initialState = {
  pitchRate: DefaultPitchRate,
  cellCount: DefaultCellCount,
  recommendedCellCount: DefaultCellCount,
  yeasts: []
};

const fermentation = (state = initialState, action) => {
  switch (action.type) {
    case SetPitchRate:
      return Object.assign({}, state, {
        pitchRate: action.rate
      });
    case AddYeast:
      return Object.assign({}, state, {
        yeasts: state.yeasts.concat(yeast(undefined, action))
      });
    case RemoveYeast:
      return Object.assign({}, state, {
        yeasts: state.yeasts.filter(y => y.id !== action.yeast.id)
      });
    case SetYeastMfgDate:
    case SetYeastAttenuation:
    case SetYeastViability:
    case AddStarterStep:
    case RemoveStarterStep:
      return Object.assign({}, state, {
        yeasts: state.yeasts.map(y => y.id === action.yeast.id ? yeast(y, action) : y)
      });
    default:
      return state;
  }
};

export default fermentation;
import RecipeActions from '../constants/RecipeActionTypes';
import yeast from './yeast';

const initialState = {
  pitchRate: 0,
  cellCount: 0,
  recommendedCellCount: 0,
  yeasts: []
};

const fermentation = (state = initialState, action) => {
  switch (action.type) {
    case RecipeActions.SetPitchRate:
      return Object.assign({}, state, {
        pitchRate: action.rate
      });
    case RecipeActions.AddYeast:
      return Object.assign({}, state, {
        yeasts: state.yeasts.concat(yeast(undefined, action))
      });
    case RecipeActions.RemoveYeast:
      return Object.assign({}, state, {
        yeasts: state.yeasts.filter(y => y.id !== action.yeast.id)
      });
    case RecipeActions.SetYeastMfgDate:
    case RecipeActions.SetYeastAttenuation:
    case RecipeActions.SetYeastQuantity:
    case RecipeActions.SetYeastViability:
    case RecipeActions.AddStarterStep:
    case RecipeActions.RemoveStarterStep:
      return Object.assign({}, state, {
        yeasts: state.yeasts.map(y => y.id === action.yeast.id ? yeast(y, action) : y)
      });
    default:
      return state;
  }
};

export default fermentation;

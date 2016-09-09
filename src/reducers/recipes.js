import {
  InvalidateSavedRecipes,
  RequestSavedRecipes,
  ReceiveSavedRecipes
} from '../constants/ServerActionTypes';
import savedRecipes from './savedRecipes';

const initialState = {
  saved: savedRecipes(undefined, {}),
  shared: {},
  public: {}
};

function recipes(state = initialState, action) {
  switch (action.type) {
    case InvalidateSavedRecipes:
    case RequestSavedRecipes:
    case ReceiveSavedRecipes:
      return Object.assign({}, state, { saved: savedRecipes(state.saved, action) });
    default:
      return state;
  }
}

export default recipes;
import { ImportRecipe } from '../constants/RecipeActionTypes';
import {
  InvalidateSavedRecipes,
  RequestSavedRecipes,
  ReceiveSavedRecipes
} from '../constants/ServerActionTypes';

const initialState = {
  isFetching: false,
  didInvalidate: true,
  recipes: []
};

function savedRecipes(state = initialState, action) {
  switch (action.type) {
    case InvalidateSavedRecipes:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case RequestSavedRecipes:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case ReceiveSavedRecipes:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        recipes: action.recipes
      });
    default:
      return state;
  }
}

export default savedRecipes;
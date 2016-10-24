import ServerActions from '../constants/ServerActionTypes';
import RecipeActions from '../constants/RecipeActionTypes';
import helpers from '../utils/helpers';
import { RecipeType } from '../constants/AppConstants';
import fetch from '../core/fetch';
import { saveRecipe, getSavedRecipes } from '../data/api';

function shouldFetchRecipes(recipeType, state) {
  const recipes = state.recipes[recipeType];
  if (!recipes) {
    return true;
  } else if (recipes.isFetching) {
    return false;
  } else {
    return recipes.didInvalidate;
  }
}

function fetchRecipesIfNeeded(recipeType) {
  return async (dispatch, getState) => {
    if (shouldFetchRecipes(recipeType, getState())) {
      const recipes = await getSavedRecipes(recipeType);
      return dispatch({
        [RecipeType.SavedRecipes]: helpers.createAction(ServerActions.ReceiveSavedRecipes, 'recipes'),
        [RecipeType.SharedRecipes]: helpers.createAction(ServerActions.ReceiveSharedRecipes, 'recipes'),
        [RecipeType.PublicRecipes]: helpers.createAction(ServerActions.ReceivePublicRecipes, 'recipes')
      }[recipeType](recipes));
    }
  };
}

export default {
  requestSavedRecipes: helpers.createAction(ServerActions.RequestSavedRecipes),
  invalidateSavedRecipes: helpers.createAction(ServerActions.InvalidateSavedRecipes),
  requestSharedRecipes: helpers.createAction(ServerActions.RequestSharedRecipes),
  invalidateSharedRecipes: helpers.createAction(ServerActions.InvalidateSharedRecipes),
  requestPublicRecipes: helpers.createAction(ServerActions.RequestPublicRecipes),
  invalidatePublicRecipes: helpers.createAction(ServerActions.InvalidatePublicRecipes),
  loadSavedRecipe: helpers.createAction(RecipeActions.LoadSavedRecipe, 'recipe'),
  fetchRecipesIfNeeded
};
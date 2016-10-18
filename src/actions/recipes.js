import ServerActions from '../constants/ServerActionTypes';
import RecipeActions from '../constants/RecipeActionTypes';
import helpers from '../utils/helpers';
import { RecipeType } from '../constants/AppConstants';
import fetch from '../core/fetch';
import { saveRecipe, getSavedRecipes } from '../data/api';

export const requestSavedRecipes = helpers.createAction(ServerActions.RequestSavedRecipes);
export const receiveSavedRecipes = helpers.createAction(ServerActions.ReceiveSavedRecipes, 'recipes');
export const invalidateSavedRecipes = helpers.createAction(ServerActions.InvalidateSavedRecipes);

export const requestSharedRecipes = helpers.createAction(ServerActions.RequestSharedRecipes);
export const receiveSharedRecipes = helpers.createAction(ServerActions.ReceiveSharedRecipes, 'recipes');
export const invalidateSharedRecipes = helpers.createAction(ServerActions.InvalidateSharedRecipes);

export const requestPublicRecipes = helpers.createAction(ServerActions.RequestPublicRecipes);
export const receivePublicRecipes = helpers.createAction(ServerActions.ReceivePublicRecipes, 'recipes');
export const invalidatePublicRecipes = helpers.createAction(ServerActions.InvalidatePublicRecipes);

export const loadSavedRecipe = helpers.createAction(RecipeActions.LoadSavedRecipe, 'recipe');
export const recipeSaved = helpers.createAction(RecipeActions.RecipeSaved);

// retrieve saved recipes
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

export function fetchRecipesIfNeeded(recipeType) {
  return async (dispatch, getState) => {
    if (shouldFetchRecipes(recipeType, getState())) {
      const recipes = await getSavedRecipes(recipeType);
      return dispatch({
        [RecipeType.SavedRecipes]: receiveSavedRecipes,
        [RecipeType.SharedRecipes]: receiveSharedRecipes,
        [RecipeType.PublicRecipes]: receivePublicRecipes
      }[recipeType](recipes));
    }
  };
}

// save recipe
export function saveCurrentRecipe(recipe) {
  return async (dispatch) => {
    const recipeId = await saveRecipe(recipe);
    return dispatch(recipeSaved(recipeId));
  };
}
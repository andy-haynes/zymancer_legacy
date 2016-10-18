import ServerActions from '../constants/ServerActionTypes';
import RecipeActions from '../constants/RecipeActionTypes';
import { RecipeType } from '../constants/AppConstants';
import fetch from '../core/fetch';
import { saveRecipe, getSavedRecipes } from '../data/api';

export function requestSavedRecipes() {
  return { type: ServerActions.RequestSavedRecipes };
}

export function requestSharedRecipes() {
  return { type: ServerActions.RequestSharedRecipes };
}

export function requestPublicRecipes() {
  return { type: ServerActions.RequestPublicRecipes };
}

export function receiveSavedRecipes(recipes) {
  return {
    type: ServerActions.ReceiveSavedRecipes,
    recipes
  };
}

export function receiveSharedRecipes(recipes) {
  return {
    type: ServerActions.ReceiveSharedRecipes,
    recipes
  };
}

export function receivePublicRecipes(recipes) {
  return {
    type: ServerActions.ReceivePublicRecipes,
    recipes
  };
}

export function invalidateSavedRecipes() {
  return { type: ServerActions.InvalidateSavedRecipes };
}

export function invalidateSharedRecipes() {
  return { type: ServerActions.InvalidateSharedRecipes };
}

export function invalidatePublicRecipes() {
  return { type: ServerActions.InvalidatePublicRecipes };
}

export function loadSavedRecipe(recipe) {
  return {
    type: RecipeActions.LoadSavedRecipe, recipe
  };
}

export function recipeSaved(recipeId) {
  return { type: RecipeActions.RecipeSaved };
}

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

const recipeActions = {
  [RecipeType.SavedRecipes]: receiveSavedRecipes,
  [RecipeType.SharedRecipes]: receiveSharedRecipes,
  [RecipeType.PublicRecipes]: receivePublicRecipes
};

export function fetchRecipesIfNeeded(recipeType) {
  return async (dispatch, getState) => {
    if (shouldFetchRecipes(recipeType, getState())) {
      const recipes = await getSavedRecipes(recipeType);
      return dispatch(recipeActions[recipeType](recipes));
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
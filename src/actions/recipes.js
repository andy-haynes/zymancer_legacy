import {
  InvalidateSavedRecipes,
  RequestSavedRecipes,
  ReceiveSavedRecipes,
  InvalidateSharedRecipes,
  RequestSharedRecipes,
  ReceiveSharedRecipes,
  InvalidatePublicRecipes,
  RequestPublicRecipes,
  ReceivePublicRecipes,
  LoadSavedRecipe
} from '../constants/ServerActionTypes';
import {
  SaveRecipe,
  RecipeSaved,
  ImportRecipe
} from '../constants/RecipeActionTypes';
import {
  RecipeType
} from '../constants/AppConstants';
import fetch from '../core/fetch';
import { saveRecipe, getSavedRecipes } from '../data/api';

export function requestSavedRecipes() {
  return { type: RequestSavedRecipes };
}

export function requestSharedRecipes() {
  return { type: RequestSharedRecipes };
}

export function requestPublicRecipes() {
  return { type: RequestPublicRecipes };
}

export function receiveSavedRecipes(recipes) {
  return {
    type: ReceiveSavedRecipes,
    recipes
  };
}

export function receiveSharedRecipes(recipes) {
  return {
    type: ReceiveSharedRecipes,
    recipes
  };
}

export function receivePublicRecipes(recipes) {
  return {
    type: ReceivePublicRecipes,
    recipes
  };
}

export function invalidateSavedRecipes() {
  return { type: InvalidateSavedRecipes };
}

export function invalidateSharedRecipes() {
  return { type: InvalidateSharedRecipes };
}

export function invalidatePublicRecipes() {
  return { type: InvalidatePublicRecipes };
}

export function recipeSaved(recipeId) {
  return { type: RecipeSaved };
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

// why does the async have to be nested in the closure here but saveCurrentRecipe can be an async action?
export function fetchRecipesIfNeeded(recipeType) {
  return async (dispatch, getState) => {
    if (shouldFetchRecipes(recipeType, getState())) {
      const recipes = await getSavedRecipes(recipeType);
      return dispatch(recipeActions[recipeType](recipes));
    }
  };
}

// save recipe
export async function saveCurrentRecipe(recipe) {
  const recipeId = await saveRecipe(recipe);
  return (dispatch, getState, helpers) => dispatch(recipeSaved(recipeId));
}
import {
  InvalidateSavedRecipes,
  RequestSavedRecipes,
  ReceiveSavedRecipes,
  InvalidateSharedRecipes,
  RequestSharedRecipes,
  ReceiveSharedRecipes,
  InvalidatePublicRecipes,
  RequestPublicRecipes,
  ReceivePublicRecipes
} from '../constants/ServerActionTypes';
import {
  SaveRecipe,
  RecipeSaved
} from '../constants/RecipeActionTypes';
import {
  RecipeType
} from '../constants/AppConstants';
import fetch from '../core/fetch';

export function requestSavedRecipes() {
  return { type: RequestSavedRecipes };
}

export function requestSharedRecipes() {
  return { type: RequestSharedRecipes };
}

export function requestPublicRecipes() {
  return { type: RequestPublicRecipes };
}

export function receiveSavedRecipes(json) {
  return {
    type: ReceiveSavedRecipes,
    recipes: json.data.savedRecipes
  };
}

export function receiveSharedRecipes(json) {
  return {
    type: ReceiveSharedRecipes,
    recipes: json.data.sharedRecipes
  };
}

export function receivePublicRecipes(json) {
  return {
    type: ReceivePublicRecipes,
    recipes: json.data.recipes
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

export function saveRecipe() {
  return { type: SaveRecipe };
}

export function recipeSaved() {
  return { type: RecipeSaved };
}

const recipeFetchMap = {
  [RecipeType.SavedRecipes]: { query: 'savedRecipes', action: receiveSavedRecipes },
  [RecipeType.SharedRecipes]: { query: 'sharedRecipes', action: receiveSharedRecipes },
  [RecipeType.PublicRecipes]: { query: 'publicRecipes', action: receivePublicRecipes },
};
function fetchRecipes(recipeType) {
  return (dispatch, getState, helpers) => {
    const { query, action } = recipeFetchMap[recipeType];
    return helpers.graphqlRequest(`{${query}{id,name}}`)
            .then(json => dispatch(action(json)));
  };
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

export function fetchRecipesIfNeeded(recipeType) {
  return (dispatch, getState) => {
    if (shouldFetchRecipes(recipeType, getState())) {
      return dispatch(fetchRecipes(recipeType));
    }
  };
}

// save recipe
export function saveCurrentRecipe(recipe) {
  return (dispatch, getState, helpers) => {
    return helpers.graphqlRequest(`{saveRecipe(name:"${recipe.name}"){id,name}}`)
            .then(response => dispatch(recipeSaved()));
  };
}
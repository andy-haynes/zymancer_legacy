import {
  InvalidateSavedRecipes,
  RequestSavedRecipes,
  ReceiveSavedRecipes
} from '../constants/ServerActionTypes';
import {
  SaveRecipe,
  RecipeSaved
} from '../constants/RecipeActionTypes';
import fetch from '../core/fetch';

export function requestSavedRecipes() {
  return { type: RequestSavedRecipes };
}

export function receiveSavedRecipes(json) {
  return {
    type: ReceiveSavedRecipes,
    recipes: json.data.userRecipes
  };
}

export function invalidateSavedRecipes() {
  return { type: InvalidateSavedRecipes };
}

export function saveRecipe() {
  return { type: SaveRecipe };
}

export function recipeSaved() {
  return { type: RecipeSaved };
}

function fetchSavedRecipes() {
  return (dispatch, getState, helpers) => {
    return helpers.graphqlRequest('{userRecipes{id,name,style}}')
            .then(json => dispatch(receiveSavedRecipes(json)));
  };
}

// retrieve saved recipes
function shouldFetchSavedRecipes(state) {
  const recipes = state.savedRecipes;
  if (!recipes) {
    return true;
  } else if (recipes.isFetching) {
    return false;
  } else {
    return recipes.didInvalidate;
  }
}

export function fetchSavedRecipesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchSavedRecipes(getState())) {
      return dispatch(fetchSavedRecipes());
    }
  };
}

// save recipe
export function saveCurrentRecipe(recipe) {
  return (dispatch, getState, helpers) => {
    return helpers.graphqlRequest(`{saveRecipe(name:"${recipe.recipeName}", style:"Oyster Pils"){id,name}}`)
            .then(response => dispatch(recipeSaved()));
  };
}
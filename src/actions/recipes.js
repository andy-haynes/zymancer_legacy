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
import { roundTo } from '../utils/core';
import _ from 'lodash';
import currentRecipe from '../reducers/currentRecipe';

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
    recipes: json.data.publicRecipes
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

export function importRecipe(recipe) {
  return {
    type: ImportRecipe,
    recipe
  };
}

const recipeFetchMap = {
  [RecipeType.SavedRecipes]: { query: 'savedRecipes', action: receiveSavedRecipes },
  [RecipeType.SharedRecipes]: { query: 'sharedRecipes', action: receiveSharedRecipes },
  [RecipeType.PublicRecipes]: { query: 'publicRecipes', action: receivePublicRecipes },
};
function fetchRecipes(recipeType) {
  return (dispatch, getState, helpers) => {
    const { query, action } = recipeFetchMap[recipeType];
    return helpers.graphqlRequest(`{${query}{ id, name, ABV, IBU, OG, FG }}`)
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
    return helpers.graphqlRequest(recipe.exportToGraphql())
            .then(response => dispatch(recipeSaved()));
  };
}

// load recipe
export function loadSavedRecipe(recipeId) {
  return (dispatch, getState, helpers) => {
    function mapJsonToRecipe(json) {
      const hops = _.groupBy(json.data.loadRecipe.hops, v => v.id);
      const rolledHops = Object.keys(hops).map(k => ({
        id: k,
        name: hops[k][0].name,
        alpha: hops[k][0].alpha,
        beta: hops[k][0].beta,
        categories: hops[k][0].categories,
        additions: hops[k].map(a => ({ minutes: a.minutes, weight: a.weight }))
      }));

      return Object.assign({}, json.data.loadRecipe, {
        hops: rolledHops,
        fermentation: {
          yeasts: json.data.loadRecipe.yeast.map(y => Object.assign({}, y, {
            mfgDate: new Date(y.mfgDate)
          }))
        }
      })
    }

    return helpers.graphqlRequest(currentRecipe.buildLoadRecipeQuery(recipeId))
            .then(json => dispatch(importRecipe(mapJsonToRecipe(json))));
  };
}
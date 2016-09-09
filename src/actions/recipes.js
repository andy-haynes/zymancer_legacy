import {
  InvalidateSavedRecipes,
  RequestSavedRecipes,
  ReceiveSavedRecipes
} from '../constants/ServerActionTypes';
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

function fetchSavedRecipes() {
  return dispatch => {
    dispatch(requestSavedRecipes());
    const recipeQuery = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: `{userRecipes(userId:1){id,name,style}}` })
    };

    return fetch('/graphql', recipeQuery)
            .then(response => response.json())
            .then(json => dispatch(receiveSavedRecipes(json)));
  };
}

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
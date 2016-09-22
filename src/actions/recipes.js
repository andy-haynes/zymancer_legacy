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

function keylessStringify(obj) {
  function parseKeys (o, str) {
    Object.keys(o).forEach(k => {
      switch (typeof o[k]) {
        case 'object':
          if (Object.keys(o[k])) {
            if (typeof o[k].length === 'undefined') {
              str += `${k}:{${parseKeys(o[k], '')}},`;
            } else {
              str += o[k].map(v => parseKeys(v, '')).join(',');
            }
          } else {
            str += o[k].toString();
          }
          break;
        case 'number':
        case 'string':
          if (!isNaN(o[k])) {
            str += `${k}:${o[k]},`;
          } else {
            str += `${k}:"${o[k]}",`;
          }
          break;
      }
    });

    return str.substring(0, str.length - 1);
  }

  return `{${parseKeys(obj, '')}}`;
}


// save recipe
export function saveCurrentRecipe(recipe) {
  return (dispatch, getState, helpers) => {
    const grains = recipe.grains.map(g => keylessStringify({
      id: g.id,
      weight: g.weight,
      lovibond: g.lovibond,
      gravity: g.gravity
    }));
    const hops = [].concat.apply([], recipe.hops.map(h => h.additions.map(a => keylessStringify({
      id: a.hop.id,
      alpha: h.alpha,
      beta: h.beta,
      minutes: a.minutes,
      weight: a.weight
    }))));
    const yeast = recipe.fermentation.yeasts.map(y => keylessStringify({
      id: y.id,
      mfgDate: y.mfgDate.toString(),
      attenuation: roundTo(y.attenuation / 100, 2),
      quantity: y.quantity
    }));

    const query = `{
      saveRecipe(
        name:"${recipe.name}",
        grains:[${grains.join(',')}],
        hops:[${hops.join(',')}],
        yeast:[${yeast.join(',')}]
      ) { id }
    }`;

    return helpers.graphqlRequest(query)
            .then(response => dispatch(recipeSaved()));
  };
}

// load recipe
export function loadSavedRecipe(recipeId) {
  return (dispatch, getState, helpers) => {
    const query = `{
      loadRecipe(id:${recipeId}) {
        id,
        name,
        grains {
          id,
          name,
          gravity,
          lovibond,
          weight {
            value,
            unit
          }
        },
        hops {
          id,
          name,
          alpha,
          beta,
          categories,
          minutes,
          weight {
            value,
            unit
          }
        },
        yeast {
          id,
          name,
          mfg,
          code,
          description,
          tolerance,
          rangeF,
          rangeC,
          mfgDate,
          attenuation,
          quantity
        }
      }
    }`;

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

    return helpers.graphqlRequest(query)
            .then(json => dispatch(importRecipe(mapJsonToRecipe(json))))
  };
}
import {
  FilterGrainResults,
  UpdateGrainResults,
  ClearGrainSearch,
  FilterHopResults,
  UpdateHopResults,
  ClearHopSearch,
  FilterYeastResults,
  UpdateYeastResults,
  ClearYeastSearch
} from '../constants/SearchActionTypes';
import {
  IngredientType,
  MinSearchQueryLength
} from '../constants/AppConstants';
import fetch from '../core/fetch';
import { extractRange } from '../utils/core';

export function filterGrainResults(query) {
  return { type: FilterGrainResults, query };
}

export function updateGrainResults({ data }) {
  return { type: UpdateGrainResults, results: data.searchGrains };
}

export function clearGrainSearch() {
  return { type: ClearGrainSearch };
}

export function filterHopResults(query) {
  return { type: FilterHopResults, query };
}

export function updateHopResults({ data }) {
  return {
    type: UpdateHopResults,
    results: data.searchHops.map(hop => Object.assign({}, hop, {
      categories: hop.categories.split(','),
      alphaRange: extractRange(hop.alpha),
      betaRange: extractRange(hop.beta)
    }))
  };
}

export function clearHopSearch() {
  return { type: ClearHopSearch };
}

export function filterYeastResults(query) {
  return { type: FilterYeastResults, query };
}

export function updateYeastResults({ data }) {
  return {
    type: UpdateYeastResults,
    results: data.searchYeast.map(yeast => Object.assign({}, yeast, {
      styles: yeast.styles.split(',')
    }))
  };
}

export function clearYeastSearch() {
  return { type: ClearYeastSearch };
}

const ingredientTypeMap = {
  [IngredientType.Grain]: {
    filter: filterGrainResults,
    update: updateGrainResults,
    buildQuery: q => `{searchGrains(query:"${q}"){id,name,gravity,lovibond}}`
  },
  [IngredientType.Hop]: {
    filter: filterHopResults,
    update: updateHopResults,
    buildQuery: q => `{searchHops(query:"${q}"){id,name,aroma,categories,alpha,beta}}`
  },
  [IngredientType.Yeast]: {
    filter: filterYeastResults,
    update: updateYeastResults,
    buildQuery: q => `{searchYeast(query:"${q}"){id,name,code,attenuation,description,flocculation,rangeF,rangeC,tolerance,mfg,styles}}`
  }
};

export function queryIngredients(ingredientType, query) {
  return (dispatch, getState, helpers) => {
    const { filter, update, buildQuery } = ingredientTypeMap[ingredientType];
    dispatch(filter(query));
    return query.length >= MinSearchQueryLength
        && helpers.graphqlRequest(buildQuery(query))
              .then(json => dispatch(update(json)));
  };
}
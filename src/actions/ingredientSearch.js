import SearchActions from '../constants/SearchActionTypes';
import { IngredientType, MinSearchQueryLength } from '../constants/AppConstants';
import fetch from '../core/fetch';
import helpers from '../utils/helpers';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';

function _filterAction(type) {
  return helpers.createAction(type, 'query');
}

function _updateAction(type, reducer, resultsKey) {
  return ({ data }) => ({
    results: data[resultsKey].map(r => reducer.create(r)),
    type
  });
}

export const clearGrainSearch = helpers.createAction(SearchActions.ClearGrainSearch);
export const clearHopSearch = helpers.createAction(SearchActions.ClearHopSearch);
export const clearYeastSearch = helpers.createAction(SearchActions.ClearYeastSearch);

const ingredientTypeMap = {
  [IngredientType.Grain]: {
    filter: _filterAction(SearchActions.FilterGrainResults),
    update: _updateAction(SearchActions.UpdateGrainResults, grain, 'searchGrains'),
    buildQuery: q => `{searchGrains(query:"${q}"){id,name,gravity,lovibond,flavor,characteristics,mfg}}`
  },
  [IngredientType.Hop]: {
    filter: _filterAction(SearchActions.FilterHopResults),
    update: _updateAction(SearchActions.UpdateHopResults, hop, 'searchHops'),
    buildQuery: q => `{searchHops(query:"${q}"){id,name,url,aroma,categories,alpha,beta}}`
  },
  [IngredientType.Yeast]: {
    filter: _filterAction(SearchActions.FilterYeastResults),
    update: _updateAction(SearchActions.UpdateYeastResults, yeast, 'searchYeast'),
    buildQuery: q => `{searchYeast(query:"${q}"){id,name,url,code,attenuationRange,description,flocculation,rangeF,rangeC,tolerance,mfg,styles}}`
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
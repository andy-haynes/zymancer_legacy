import SearchActions from '../constants/SearchActionTypes';
import { IngredientType, MinSearchQueryLength } from '../constants/AppConstants';
import fetch from '../core/fetch';
import helpers from '../utils/helpers';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
import { tokenizeIngredients } from '../data/api';

function _filterAction(type) {
  return helpers.createAction(type, 'query');
}

function _updateAction(type, reducer, resultsKey) {
  return ({ data }) => ({
    results: data[resultsKey].map(r => reducer.create(r)),
    type
  });
}

const ingredientTypeMap = {
  [IngredientType.Grain]: {
    filter: _filterAction(SearchActions.FilterGrainResults),
    update: _updateAction(SearchActions.UpdateGrainResults, grain, 'searchGrains'),
    buildQuery: q => `{searchGrains(query:"${q}"){id,name,gravity,isExtract,DBCG,DBFG,lovibond,lintner,flavor,characteristics,mfg}}`
  },
  [IngredientType.Hop]: {
    filter: _filterAction(SearchActions.FilterHopResults),
    update: _updateAction(SearchActions.UpdateHopResults, hop, 'searchHops'),
    buildQuery: q => `{searchHops(query:"${q}"){id,name,url,aroma,categories,alpha,beta}}`
  },
  [IngredientType.Yeast]: {
    filter: _filterAction(SearchActions.FilterYeastResults),
    update: _updateAction(SearchActions.UpdateYeastResults, yeast, 'searchYeast'),
    buildQuery: q => `{searchYeast(query:"${q}"){id,name,url,code,attenuationLow,attenuationHigh,description,flocculation,temperatureLow,temperatureHigh,toleranceLow,toleranceHigh,mfg,styles}}`
  }
};

function queryIngredients(ingredientType, query) {
  return (dispatch, getState, helpers) => {
    const { filter, update, buildQuery } = ingredientTypeMap[ingredientType];
    dispatch(filter(query));
    return query.length >= MinSearchQueryLength
        && helpers.graphqlRequest(buildQuery(query))
              .then(json => dispatch(update(json)));
  };
}

const loadSearchCache = helpers.createAction(SearchActions.LoadSearchCache, 'tokenized');
function updateSearchCache() {
  return async (dispatch) => {
    const tokenized = await tokenizeIngredients();
    return dispatch(loadSearchCache(tokenized));
  };
}

export default {
  clearGrainSearch: helpers.createAction(SearchActions.ClearGrainSearch),
  clearHopSearch: helpers.createAction(SearchActions.ClearHopSearch),
  clearYeastSearch: helpers.createAction(SearchActions.ClearYeastSearch),
  loadSearchCache,
  queryIngredients,
  updateSearchCache
};
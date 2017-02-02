import SearchActions from '../constants/SearchActionTypes';
import { IngredientType, MinSearchQueryLength } from '../constants/AppConstants';
import fetch from '../core/fetch';
import helpers from '../utils/helpers';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
import { searchIngredients, tokenizeIngredients } from '../data/api';

function queryIngredients(ingredientType, query, searchCache) {
  return async (dispatch) => {
    const createActions = (filterAction, updateAction, reducer) => ({
      filter: helpers.createAction(filterAction, 'query'),
      update: (results) => ({
        results: results.map(r => reducer.create(r)),
        type: updateAction
      })
    });

    const { filter, update } = {
      [IngredientType.Grain]: createActions(SearchActions.FilterGrainResults, SearchActions.UpdateGrainResults, grain),
      [IngredientType.Hop]: createActions(SearchActions.FilterHopResults, SearchActions.UpdateHopResults, hop),
      [IngredientType.Yeast]: createActions(SearchActions.FilterYeastResults, SearchActions.UpdateYeastResults, yeast)
    }[ingredientType];

    dispatch(filter(query));
    const results = await searchIngredients(ingredientType, query, searchCache);
    return dispatch(update(results));
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
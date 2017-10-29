import SearchActions from '../constants/SearchActionTypes';
import { IngredientType } from '../constants/AppConstants';
import helpers from '../utils/helpers';
import { searchIngredients, tokenizeIngredients } from '../data/api';

function queryIngredients(ingredientType, query, searchCache) {
  return async (dispatch) => {
    const createActions = (filterAction, updateAction) => ({
      filter: helpers.createAction(filterAction, 'query'),
      update: (results) => ({
        type: updateAction,
        results
      })
    });

    const { filter, update } = {
      [IngredientType.Grain]: createActions(SearchActions.FilterGrainResults, SearchActions.UpdateGrainResults),
      [IngredientType.Hop]: createActions(SearchActions.FilterHopResults, SearchActions.UpdateHopResults),
      [IngredientType.Yeast]: createActions(SearchActions.FilterYeastResults, SearchActions.UpdateYeastResults)
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
  createIngredient: helpers.createAction(SearchActions.CreateIngredient, 'ingredientType', 'form'),
  loadSearchCache,
  queryIngredients,
  updateSearchCache
};

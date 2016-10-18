import SearchActions from '../constants/SearchActionTypes';
import { IngredientType, MinSearchQueryLength } from '../constants/AppConstants';
import fetch from '../core/fetch';
import helpers from '../utils/helpers';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';

export const filterGrainResults = helpers.createAction(SearchActions.FilterGrainResults, 'query');
export const updateGrainResults = helpers.createAction(SearchActions.UpdateGrainResults, 'results');
export const clearGrainSearch = helpers.createAction(SearchActions.ClearGrainSearch);

export const filterHopResults = helpers.createAction(SearchActions.FilterHopResults, 'query');
export const updateHopResults = helpers.createAction(SearchActions.UpdateHopResults, 'results');
export const clearHopSearch = helpers.createAction(SearchActions.ClearHopSearch);

export const filterYeastResults = helpers.createAction(SearchActions.FilterYeastResults, 'query');
export const updateYeastResults = helpers.createAction(SearchActions.UpdateYeastResults, 'results');
export const clearYeastSearch = helpers.createAction(SearchActions.ClearYeastSearch);

const ingredientTypeMap = {
  [IngredientType.Grain]: {
    filter: filterGrainResults,
    update: updateGrainResults,
    buildQuery: q => `{searchGrains(query:"${q}"){id,name,gravity,lovibond,flavor,characteristics,mfg}}`
  },
  [IngredientType.Hop]: {
    filter: filterHopResults,
    update: updateHopResults,
    buildQuery: q => `{searchHops(query:"${q}"){id,name,url,aroma,categories,alpha,beta}}`
  },
  [IngredientType.Yeast]: {
    filter: filterYeastResults,
    update: updateYeastResults,
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
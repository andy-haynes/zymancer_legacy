import SearchActions from '../constants/SearchActionTypes';
import searchCache from './searchCache';
import grain from './grain';
import hop from './hop';
import yeast from './yeast';
import {
  IngredientType,
  MinSearchQueryLength
} from '../constants/AppConstants';

function createIngredientSearchReducer(ingredientType) {
  const { filter, update, clear, reducer } = {
    [IngredientType.Grain]: {
      filter: SearchActions.FilterGrainResults,
      update: SearchActions.UpdateGrainResults,
      clear: SearchActions.ClearGrainSearch,
      reducer: grain
    },
    [IngredientType.Hop]: {
      filter: SearchActions.FilterHopResults,
      update: SearchActions.UpdateHopResults,
      clear: SearchActions.ClearHopSearch,
      reducer: hop
    },
    [IngredientType.Yeast]: {
      filter: SearchActions.FilterYeastResults,
      update: SearchActions.UpdateYeastResults,
      clear: SearchActions.ClearYeastSearch,
      reducer: yeast
    }
  }[ingredientType];

  const initialState = {
    query: '',
    results: [],
    loading: false,
    error: null,
    active: false
  };

  return (state = initialState, action) => {
    const mapResults = (ingredient) => reducer.create(ingredient, action.configuration);

    switch (action.type) {
      case SearchActions.CreateIngredient:
        return Object.assign({}, state, {
          query: '',
          results: [],
          loading: false,
          active: false
        });
      case filter:
        return Object.assign({}, state, {
          query: action.query,
          results: action.query.length ? state.results.map(mapResults) : [],
          loading: action.query.length >= MinSearchQueryLength,
          error: null,
          active: action.query.length > 0
        });
      case update:
        return Object.assign({}, state, {
          results: action.results.map(mapResults),
          loading: false,
          error: null,
          active: true
        });
      case clear:
        return initialState;
      default:
        return state;
    }
  }
}

const initialState = {
  [IngredientType.Grain]: createIngredientSearchReducer(IngredientType.Grain)(undefined, {}),
  [IngredientType.Hop]: createIngredientSearchReducer(IngredientType.Hop)(undefined, {}),
  [IngredientType.Yeast]: createIngredientSearchReducer(IngredientType.Yeast)(undefined, {}),
  cache: searchCache(undefined, {})
};

function recipes(state = initialState, action) {
  function setSearchState(ingredientType) {
    return Object.assign({}, state, {
      [ingredientType]: createIngredientSearchReducer(ingredientType)(state[ingredientType], action)
    });
  }

  switch (action.type) {
    case SearchActions.FilterGrainResults:
    case SearchActions.UpdateGrainResults:
    case SearchActions.ClearGrainSearch:
      return setSearchState(IngredientType.Grain);
    case SearchActions.FilterHopResults:
    case SearchActions.UpdateHopResults:
    case SearchActions.ClearHopSearch:
      return setSearchState(IngredientType.Hop);
    case SearchActions.FilterYeastResults:
    case SearchActions.UpdateYeastResults:
    case SearchActions.ClearYeastSearch:
      return setSearchState(IngredientType.Yeast);
    case SearchActions.LoadSearchCache:
      return Object.assign({}, state, {
        cache: searchCache(state.cache, action)
      });
    default:
      return state;
  }
}

export default recipes;

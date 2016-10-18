import SearchActions from '../constants/SearchActionTypes';
import Defaults from '../constants/Defaults';
import { IngredientType } from '../constants/AppConstants';

function createIngredientSearchReducer(ingredientType) {
  const { filter, update, clear } = {
    [IngredientType.Grain]: { filter: SearchActions.FilterGrainResults, update: SearchActions.UpdateGrainResults, clear: SearchActions.ClearGrainSearch },
    [IngredientType.Hop]:   { filter: SearchActions.FilterHopResults,   update: SearchActions.UpdateHopResults,   clear: SearchActions.ClearHopSearch },
    [IngredientType.Yeast]: { filter: SearchActions.FilterYeastResults, update: SearchActions.UpdateYeastResults, clear: SearchActions.ClearYeastSearch }
  }[ingredientType];

  const initialState = {
    query: '',
    results: [],
    loading: false,
    error: null
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case filter:
        return Object.assign({}, state, {
          query: action.query,
          results: action.query.length ? state.results : [],
          loading: action.query.length >= Defaults.MinSearchQueryLength,
          error: null
        });
      case update:
        return Object.assign({}, state, {
          results: action.results,
          loading: false,
          error: null
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
  [IngredientType.Yeast]: createIngredientSearchReducer(IngredientType.Yeast)(undefined, {})
};

function recipes(state = initialState, action) {
  switch (action.type) {
    case SearchActions.FilterGrainResults:
    case SearchActions.UpdateGrainResults:
    case SearchActions.ClearGrainSearch:
      return Object.assign({}, state, {
        [IngredientType.Grain]: createIngredientSearchReducer(IngredientType.Grain)(state[IngredientType.Grain], action)
      });
    case SearchActions.FilterHopResults:
    case SearchActions.UpdateHopResults:
    case SearchActions.ClearHopSearch:
      return Object.assign({}, state, {
        [IngredientType.Hop]: createIngredientSearchReducer(IngredientType.Hop)(state[IngredientType.Hop], action)
      });
    case SearchActions.FilterYeastResults:
    case SearchActions.UpdateYeastResults:
    case SearchActions.ClearYeastSearch:
      return Object.assign({}, state, {
        [IngredientType.Yeast]: createIngredientSearchReducer(IngredientType.Yeast)(state[IngredientType.Yeast], action)
      });
    default:
      return state;
  }
}

export default recipes;
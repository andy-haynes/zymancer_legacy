import {
  FilterGrainResults,
  UpdateGrainResults,
  ClearGrainSearch,
  FilterHopResults,
  UpdateHopResults,
  ClearHopSearch,
  FilterYeastResults,
  UpdateYeastResults,
  ClearYeastSearch,
  MinSearchQueryLength
} from '../constants/SearchActionTypes';
import {
  IngredientType
} from '../constants/AppConstants';

const searchTypeMap = {
  [IngredientType.Grain]: { filter: FilterGrainResults, update: UpdateGrainResults, clear: ClearGrainSearch },
  [IngredientType.Hop]: { filter: FilterHopResults, update: UpdateHopResults, clear: ClearHopSearch },
  [IngredientType.Yeast]: { filter: FilterYeastResults, update: UpdateYeastResults, clear: ClearYeastSearch }
};

function createIngredientSearchReducer(ingredientType) {
  const { filter, update, clear } = searchTypeMap[ingredientType];
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
          loading: action.query.length >= MinSearchQueryLength,
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
    case FilterGrainResults:
    case UpdateGrainResults:
    case ClearGrainSearch:
      return Object.assign({}, state, {
        [IngredientType.Grain]: createIngredientSearchReducer(IngredientType.Grain)(state[IngredientType.Grain], action)
      });
    case FilterHopResults:
    case UpdateHopResults:
    case ClearHopSearch:
      return Object.assign({}, state, {
        [IngredientType.Hop]: createIngredientSearchReducer(IngredientType.Hop)(state[IngredientType.Hop], action)
      });
    case FilterYeastResults:
    case UpdateYeastResults:
    case ClearYeastSearch:
      return Object.assign({}, state, {
        [IngredientType.Yeast]: createIngredientSearchReducer(IngredientType.Yeast)(state[IngredientType.Yeast], action)
      });
    default:
      return state;
  }
}

export default recipes;
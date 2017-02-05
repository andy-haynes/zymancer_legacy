import { IngredientType } from '../constants/AppConstants';
import SearchActions from '../constants/SearchActionTypes';
import pick from 'lodash/pick';

const initialState = {
  [IngredientType.Grain]: [],
  [IngredientType.Hop]: [],
  [IngredientType.Yeast]: []
};

function searchCache(state = initialState, action) {
  switch (action.type) {
    case SearchActions.LoadSearchCache:
      return Object.assign({}, state, pick(action.tokenized, Object.keys(initialState)));
    default:
      return state;
  }
}

export default searchCache;
import SearchActions from '../constants/SearchActionTypes';
import pick from 'lodash/pick';

const initialState = {
  grains: [],
  hops: [],
  yeast: []
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
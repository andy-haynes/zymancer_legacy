import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import yeast from './yeast';

const initialState = {
  id: 1
};

const style = (state = initialState, action) => {
  switch (action.type) {
    case RecipeActions.SetRecipeStyle:
      return Object.assign({}, state, {
        style: action.style
      });
    default:
      return state;
  }
};

export default style;
import RecipeActions from '../constants/RecipeActionTypes';
import BJCPStyles from '../constants/BJCPStyles';

const style = (state, action) => {
  if (typeof state === 'undefined') {
    return {
      id: Math.ceil(Math.random() * BJCPStyles.length)
    }
  }

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

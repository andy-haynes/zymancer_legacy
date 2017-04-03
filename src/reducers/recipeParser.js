import RecipeActions from '../constants/RecipeActionTypes';

const initialState = {
  text: '',
  recipe: {},
  suggestions: []
};

const recipeParser = (state = initialState, action) => {
  switch (action.type) {
    case RecipeActions.UpdateRecipeText:
      return Object.assign({}, state, {
        text: action.recipeText
      });
    case RecipeActions.ParseRecipeText:
      return Object.assign({}, state, {
        recipe: action.recipe
      });
    default:
      return state;
  }
};

export default recipeParser;
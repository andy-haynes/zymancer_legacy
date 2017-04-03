import RecipeActions from '../constants/RecipeActionTypes';
import helpers from '../utils/helpers';
import parseText from '../utils/parseRecipe';
import actions from '../actions';
import { buildParsedRecipe } from '../data/api';

function parseRecipeText(recipeText, searchCache) {
  const parsed = parseText(recipeText);
  return async (dispatch) => {
    if (parsed !== null) {
      const recipe = await buildParsedRecipe(parsed, searchCache);
      if (recipe) {
        return dispatch(actions.parser.updateSuggestions(recipe))
      }
    }

    // todo: display error
  };
}

export default {
  updateRecipeText: helpers.createAction(RecipeActions.UpdateRecipeText, 'recipeText'),
  updateSuggestions: helpers.createAction(RecipeActions.ParseRecipeText, 'recipe'),
  parseRecipeText
};
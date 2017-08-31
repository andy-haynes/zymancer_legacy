import RecipeActions from '../constants/RecipeActionTypes';
import helpers from '../utils/helpers';
import parseText from '../utils/parseRecipe';
import actions from '../actions';
import { matchParsedIngredients } from '../data/api';

function parseRecipeText(recipeText, searchCache) {
  const parsed = parseText(recipeText);
  return async (dispatch) => {
    if (parsed !== null) {
      const recipe = await matchParsedIngredients(parsed, searchCache);
      if (recipe) {
        return dispatch(actions.parser.updateSuggestions(recipe));
      }
    }

    // todo: display error
  };
}

export default {
  clear: helpers.createAction(RecipeActions.ClearParser),
  updateRecipeText: helpers.createAction(RecipeActions.UpdateRecipeText, 'recipeText'),
  updateSuggestions: helpers.createAction(RecipeActions.ParseRecipeText, 'recipe'),
  selectIngredientSuggestion: helpers.createAction(RecipeActions.SelectIngredientSuggestion, 'ingredientKey', 'matchId', 'suggestionId'),
  selectParsedIngredient: helpers.createAction(RecipeActions.SelectParsedIngredient, 'lineNumber'),
  parseRecipeText
};

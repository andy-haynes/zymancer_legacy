import RecipeActions from '../constants/RecipeActionTypes';
import { IngredientType } from '../constants/AppConstants';
import uniqBy from 'lodash/uniqBy';

const initialState = {
  text: '',
  recipe: {},
  suggestions: {}
};

const recipeParser = (state = initialState, action) => {
  switch (action.type) {
    case RecipeActions.UpdateRecipeText:
      return Object.assign({}, state, {
        text: action.recipeText
      });
    case RecipeActions.SelectIngredientSuggestion:
      const { ingredientKey, matchId, suggestionId } = action;
      return Object.assign({}, state, {
        suggestions: Object.assign({}, state.suggestions, {
          [ingredientKey]: state.suggestions[ingredientKey].map(i => i.id !== matchId ? i : Object.assign({}, i, {
            suggestions: i.suggestions.map(s => Object.assign({}, s, {
              active: s.id === suggestionId
            }))
          }))
        })
      });
    case RecipeActions.ParseRecipeText:
      return Object.assign({}, state, {
        recipe: action.recipe,
        suggestions: Object.assign(action.recipe, {
          grains: uniqBy(action.recipe.grains, g => `${g.name}|${g.lovibond}|${g.gravity}`),
          hops: uniqBy(action.recipe.hops, h => `${h.name}`),
          yeast: uniqBy(action.recipe.yeast, y => `${y.name}|${y.mfg}|${y.code}`)
        })
      });
    default:
      return state;
  }
};

export default recipeParser;
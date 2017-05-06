import RecipeActions from '../constants/RecipeActionTypes';
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
    case RecipeActions.ParseRecipeText:
      return Object.assign({}, state, {
        recipe: action.recipe,
        suggestions: Object.assign(action.recipe, {
          grains: uniqBy(action.recipe.grains, g => `${g.name}|${g.lovibond}|${g.gravity}`),
          hops: uniqBy(action.recipe.hops, h => `${h.name}|${h.alpha}`),
          yeasts: uniqBy(action.recipe.yeasts, y => `${y.name}|${y.mfg}|${y.code}`)
        })
      });
    default:
      return state;
  }
};

export default recipeParser;
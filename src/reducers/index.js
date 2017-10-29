import { combineReducers } from 'redux';
import currentRecipe from './currentRecipe';
import recipes from './recipes';
import ingredientSearch from './ingredientSearch';
import auth from './auth';
import recipeParser from './recipeParser';
import configuration from './configuration';

export default combineReducers({
  currentRecipe,
  recipes,
  ingredientSearch,
  auth,
  recipeParser,
  configuration,
  isMobile: (state) => state || false
});

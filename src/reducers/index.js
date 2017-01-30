import { combineReducers } from 'redux';
import currentRecipe from './currentRecipe';
import recipes from './recipes';
import ingredientSearch from './ingredientSearch';
import auth from './auth';
import recipeParser from './recipeParser';
import searchCache from './searchCache';

export default combineReducers({
  currentRecipe,
  recipes,
  ingredientSearch,
  auth,
  recipeParser,
  searchCache
});
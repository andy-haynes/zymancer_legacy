import { combineReducers } from 'redux';
import currentRecipe from './currentRecipe';
import recipes from './recipes';
import ingredientSearch from './ingredientSearch';

export default combineReducers({
  currentRecipe,
  recipes,
  ingredientSearch
});
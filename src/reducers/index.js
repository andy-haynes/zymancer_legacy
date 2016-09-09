import { combineReducers } from 'redux';
import currentRecipe from './currentRecipe';
import recipes from './recipes';

export default combineReducers({
  currentRecipe,
  recipes
});
import { combineReducers } from 'redux';
import currentRecipe from './currentRecipe';
import runtime from './runtime';
import recipes from './recipes';

export default combineReducers({
  currentRecipe,
  recipes,
  runtime
});
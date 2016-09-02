import { combineReducers } from 'redux';
import recipe from './recipe';
import runtime from './runtime';
import savedRecipes from './savedRecipes';

export default combineReducers({
  recipe,
  savedRecipes,
  runtime
});

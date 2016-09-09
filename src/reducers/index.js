import { combineReducers } from 'redux';
import recipe from './recipe';
import runtime from './runtime';
import recipes from './recipes';

export default combineReducers({
  recipe,
  recipes,
  runtime
});
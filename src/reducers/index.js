import { combineReducers } from 'redux';
import recipe from './recipe';
import runtime from './runtime';

export default combineReducers({
  recipe,
  runtime
});

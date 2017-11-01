import recipe from './recipe';
import saved from './saved';
import search from './search';
import parser from './parser';
import helpers from '../utils/helpers';

export const SetRoute = 'SetRoute';

export default {
  recipe,
  saved,
  search,
  parser,
  setRoute: helpers.createAction(SetRoute, 'route')
};

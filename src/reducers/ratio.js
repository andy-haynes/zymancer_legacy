import Defaults from '../constants/Defaults';
import helpers from '../utils/helpers';

const ratio = (state = {}, action) => {
  return helpers.convertRatio(state, Object.assign({}, state, action.ratio), 2);
};

export default ratio;
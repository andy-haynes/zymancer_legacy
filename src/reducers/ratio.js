import helpers from '../utils/helpers';

const ratio = (state = {}, action) => {
  let value = action.ratio.value;
  if (!helpers.isIncompleteDecimal(value)) {
    if (value === '') {
      value = 0;
    } else if (value === null || isNaN(value)) {
      value = state.value;
    } else {
      value = parseFloat(value);
    }
  } else if (value === '.') {
    value = '0.';
  }

  return Object.assign(helpers.convertRatio(
    state,
    Object.assign({}, state, action.ratio, { value }),
    2
  ), { value });
};

export default ratio;
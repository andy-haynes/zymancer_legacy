import helpers from '../utils/helpers';

const ratio = (state = {}, action) => {
  let value = action.ratio.value;
  if (!helpers.isIncompleteDecimal(value)) {
    if (value === '') {
      value = 0;
    } else if (value === '.') {
      value = '0.';
    } else if (value === null || isNaN(value)) {
      value = state.value;
    } else {
      value = parseFloat(value);
    }
  }

  return Object.assign(helpers.convertRatio(
    state,
    Object.assign({}, action.ratio, { value }),
    2
  ));
};

export default ratio;

import Defaults from '../constants/Defaults';
import helpers from '../utils/helpers';

const measurement = (state = {}, action) => {
  const { measurement } = action;
  let { value } = measurement;
  if (value === '') {
  // map empty input to 0
    return Object.assign({}, state, { value: 0 });
  } else if (helpers.isIncompleteDecimal(value)) {
    // keep strings ending in . - convert sole . to 0.
    if (value === '.') {
      value = '0.';
    }
    return Object.assign({}, state, { value });
  } else if (value === null || isNaN(value)) {
    // no/bad input, keep current
    return Object.assign(measurement, state);
  } else if (state.unit !== measurement.unit) {
    // convert unit
    return helpers.convertToUnit(state, measurement.unit, Defaults.MeasurementPrecision[action.type] || 1);
  } else {
    // parse input
    measurement.value = parseFloat(value);
    return Object.assign({}, state, measurement);
  }
};

export default measurement;
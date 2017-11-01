import helpers from '../utils/helpers';
import { MeasurementPrecision } from '../constants/AppConstants';

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
    const precision = MeasurementPrecision[action.type] || action.precision || 1;
    return helpers.convertToUnit(state, measurement.unit, precision);
  } else {
    // parse input
    measurement.value = parseFloat(value);
    return Object.assign({}, state, measurement);
  }
};

export default measurement;

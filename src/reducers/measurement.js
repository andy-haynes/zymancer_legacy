import Defaults from '../constants/Defaults';
import helpers from '../utils/helpers';

const measurement = (state = {}, action) => {
  const m = action.measurement;
  if (m.value === null || isNaN(m.value)) {
    return Object.assign(m, { value:  state.value });
  } else if (state.unit !== m.unit) {
    return helpers.convertToUnit(state, m.unit, Defaults.MeasurementPrecision[action.type] || 1);
  }

  return Object.assign({}, state, action.measurement);
};

export default measurement;
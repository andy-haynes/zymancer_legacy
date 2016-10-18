import Defaults from '../constants/Defaults';
import helpers from '../utils/helpers';

const measurement = (state = {}, action) => {
  let quantity = Object.assign({}, action.measurement);
  if (quantity.value === null || isNaN(quantity.value)) {
    quantity.value = 0;
  } else if (state.unit !== quantity.unit) {
    quantity.value = helpers.convertToUnit(state, quantity.unit, Defaults.MeasurementPrecision[action.type] || 1);
  }
  return quantity;
};

export default measurement;
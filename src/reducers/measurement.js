import { MeasurementPrecision } from '../constants/Defaults';
import { convertToUnit } from '../utils/core';
import _ from 'lodash';

const measurement = (state = {}, action) => {
  let quantity = Object.assign({}, action.measurement);
  if (quantity.value === null || isNaN(quantity.value)) {
    quantity.value = 0;
  } else if (state.unit !== quantity.unit) {
    quantity.value = convertToUnit(state, quantity.unit, MeasurementPrecision[action.type] || 1);
  }
  return quantity;
};

export default measurement;
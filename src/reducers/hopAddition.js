import { AddHop, AddHopAddition, SetHopAdditionTime, SetHopAdditionWeight } from '../constants/RecipeActionTypes';
import { DefaultHopAdditionWeight } from '../constants/Defaults';
import measurement from './measurement';

let additionId = 0;

function createHopAddition(addition = {}) {
  return {
    id: additionId++,
    minutes: isNaN(addition.minutes) ? 60 : addition.minutes,
    weight: addition.weight || DefaultHopAdditionWeight
  };
}

const hopAddition = (state = {}, action) => {
  switch (action.type) {
    case AddHop:
    case AddHopAddition:
      return createHopAddition(action.addition);
    case SetHopAdditionTime:
      return {
        minutes: action.minutes,
        ...state
      };
    case SetHopAdditionWeight:
      return {
        weight: measurement(state.weight, action),
        ...state
      };
    default:
      return state;
  }
};

hopAddition.create = createHopAddition;

export default hopAddition;
import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import measurement from './measurement';

let additionId = 0;

function createHopAddition(addition = {}) {
  return {
    id: additionId++,
    minutes: isNaN(addition.minutes) ? 60 : addition.minutes,
    weight: addition.weight || Defaults.HopAdditionWeight
  };
}

const hopAddition = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.AddHopAddition:
      return createHopAddition(action.addition);
    case RecipeActions.SetHopAdditionTime:
      return Object.assign({}, state, {
        minutes: action.minutes
      });
    case RecipeActions.SetHopAdditionWeight:
      return Object.assign({}, state, {
        weight: measurement(state.weight, action)
      });
    default:
      return state;
  }
};

hopAddition.create = createHopAddition;

export default hopAddition;
import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import measurement from './measurement';

let additionId = 0;

function createHopAddition(addition = {}, minutes) {
  return {
    id: additionId++,
    minutes: isNaN(addition.minutes) ? minutes : addition.minutes,
    weight: addition.weight || Defaults.HopAdditionWeight,
    defaultAddition: true
  };
}

const hopAddition = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.AddHopAddition:
      return createHopAddition(undefined, action.boilMinutes);
    case RecipeActions.SetHopAdditionTime:
      return Object.assign({}, state, {
        minutes: action.minutes,
        defaultAddition: false
      });
    case RecipeActions.SetHopAdditionWeight:
      return Object.assign({}, state, {
        weight: measurement(state.weight, action),
        defaultAddition: false
      });
    case RecipeActions.SetBoilTime:
      return !state.defaultAddition ? state : Object.assign({}, state, {
        minutes: action.minutes
      });
    default:
      return state;
  }
};

hopAddition.create = createHopAddition;

export default hopAddition;
import RecipeActions from '../constants/RecipeActionTypes';
import measurement from './measurement';

let additionId = 0;

function createHopAddition(addition = {}, hop, configuration, minutes, manual = false) {
  const { hops: defaults } = configuration.defaults;
  return {
    id: (hop.id * 1000) + additionId++,
    minutes: isNaN(addition.minutes) ? minutes : addition.minutes || 0,
    type: addition.type || defaults.additionType,
    weight: addition.weight || defaults.weight,
    defaultAddition: manual
  };
}

const hopAddition = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.AddHopAddition:
      return createHopAddition(undefined, action.hop, action.configuration, action.boilMinutes, true);
    case RecipeActions.SetHopAdditionType:
      return Object.assign({}, state, {
        type: action.additionType,
        defaultAddition: false
      });
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

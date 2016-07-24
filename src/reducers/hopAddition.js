import { AddHop, AddHopAddition, SetHopAdditionTime, SetHopAdditionWeight } from '../constants/RecipeActionTypes';
import { DefaultHopAdditionWeight } from '../constants/Defaults';
import _ from 'lodash';
import measurement from './measurement';

const hopAddition = (state = {}, action) => {
  switch (action.type) {
    case AddHop:
    case AddHopAddition:
      return {
        id: action.additionId,
        hop: action.hop,
        minutes: 60,
        weight: DefaultHopAdditionWeight
      };
    case SetHopAdditionTime:
      return {
        ...state,
        minutes: action.minutes
      };
    case SetHopAdditionWeight:
      return {
        ...state,
        weight: measurement(state.weight, action)
      };
    default:
      return state;
  }
};

export default hopAddition;
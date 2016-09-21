import { AddGrain, SetGrainWeight, SetGrainGravity, SetGrainLovibond } from '../constants/RecipeActionTypes';
import { DefaultGrainWeight } from '../constants/Defaults';
import { calculateSRM, SRMtoRGB } from '../utils/BrewMath';
import measurement from './measurement';

const grain = (state = {}, action) => {
  switch (action.type) {
    case AddGrain:
      return {
        id: action.grain.id,
        name: action.grain.name,
        weight: DefaultGrainWeight,
        gravity: action.grain.gravity,
        lovibond: parseFloat(action.grain.lovibond),
        category: action.grain.category,
        description: action.grain.description
      };
    case SetGrainWeight:
      return Object.assign({}, state, { weight: measurement(state.weight, action) });
    case SetGrainGravity:
      return Object.assign({}, state, { gravity: action.gravity });
    case SetGrainLovibond:
      return Object.assign({}, state, { lovibond: action.lovibond });
    default:
      return state;
  }
};

export default grain;
import { AddGrain, SetGrainWeight, SetGrainGravity, SetGrainLovibond } from '../constants/RecipeActionTypes';
import { DefaultGrainWeight } from '../constants/Defaults';
import { calculateSRM, SRMtoRGB } from '../utils/BrewMath';
import measurement from './measurement';

function createGrain(grain) {
  return {
    id: grain.id,
    name: grain.name,
    mfg: grain.mfg,
    weight: grain.weight || DefaultGrainWeight,
    gravity: grain.gravity || 1,
    lovibond: parseFloat(grain.lovibond),
    category: grain.category,
    description: grain.description,
    characteristics: typeof grain.characteristics === 'object' ? grain.characteristics.split(',') : grain.characteristics,
    flavor: grain.flavor
  }
}

const grain = (state = {}, action) => {
  switch (action.type) {
    case AddGrain:
      return createGrain(action.grain);
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

grain.create = createGrain;

export default grain;
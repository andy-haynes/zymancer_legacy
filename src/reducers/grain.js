import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import measurement from './measurement';

function createGrain(grain) {
  return {
    id: grain.id,
    name: grain.name,
    mfg: grain.mfg,
    weight: grain.weight || Defaults.GrainWeight,
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
    case RecipeActions.AddGrain:
      return createGrain(action.grain);
    case RecipeActions.SetGrainWeight:
      return Object.assign({}, state, { weight: measurement(state.weight, action) });
    case RecipeActions.SetGrainGravity:
      return Object.assign({}, state, { gravity: action.gravity });
    case RecipeActions.SetGrainLovibond:
      return Object.assign({}, state, { lovibond: action.lovibond });
    default:
      return state;
  }
};

grain.create = createGrain;

export default grain;
import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import { ExtractType, ExtractGravity } from '../constants/AppConstants';
import measurement from './measurement';
import helpers from '../utils/helpers';
import pick from 'lodash/pick';

let grainId = 0;

function createGrain(grain) {
  const props = pick(grain, 'id', 'name', 'mfg', 'url', 'DBCG', 'DBFG', 'isExtract', 'category', 'flavor');
  const extractType = grain.isExtract ? (grain.extractType || ExtractType.Dry) : null;

  if (typeof props.id === 'undefined') {
    props.id = ++grainId;
  }

  let lovibond = grain.lovibond;
  if (!isNaN(parseFloat(lovibond))) {
    lovibond = parseFloat(lovibond);
  } else {
    const lovibondRange = helpers.extractRange(lovibond);
    if (lovibondRange !== null) {
      lovibond = lovibondRange.avg;
    } else {
      lovibond = Defaults.GrainLovibond;
    }
  }

  return Object.assign(props, {
    description: grain.description || '',
    weight: grain.weight || Defaults.GrainWeight,
    gravity: grain.gravity || (extractType ? ExtractGravity[extractType] : Defaults.GrainGravity),
    lintner: parseFloat(grain.lintner) || 0,
    characteristics: grain.characteristics ? (typeof grain.characteristics === 'object' ? grain.characteristics.split(',') : grain.characteristics) : null,
    matchScore: grain.score || 0,
    lovibond,
    extractType
  });
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
    case RecipeActions.SetGrainLintner:
      return Object.assign({}, state, { lintner: action.lintner });
    case RecipeActions.SetGrainExtractType:
      const { extractType } = action;
      return Object.assign({}, state, { extractType, gravity: ExtractGravity[action.extractType] });
    default:
      return state;
  }
};

grain.create = createGrain;

export default grain;
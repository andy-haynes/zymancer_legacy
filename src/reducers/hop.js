import RecipeActions from '../constants/RecipeActionTypes';
import hopAddition from './hopAddition';
import helpers from '../utils/helpers';
import _ from 'lodash';

function createHop(hop) {
  const alphaRange = hop.alphaRange || helpers.extractRange(hop.alpha);
  const betaRange = hop.betaRange || helpers.extractRange(hop.beta);

  return {
    id: hop.id,
    name: hop.name,
    alpha: isNaN(hop.alpha) ? _.round(alphaRange.avg, 1) : hop.alpha,
    beta: isNaN(hop.beta) ? _.round(betaRange.avg, 1) : hop.beta,
    additions: (hop.additions || [undefined]).map(a => hopAddition.create(a)),
    categories: typeof hop.categories === 'string' ? hop.categories.split(',') : hop.categories,
    alphaRange,
    betaRange
  };
}

const hop = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.AddHop:
      // TODO: add boil time to action to always set new hops at max time
      return createHop(action.hop);
    case RecipeActions.SetHopAlpha:
      return Object.assign({}, state, { alpha: action.alpha });
    case RecipeActions.SetHopBeta:
      return Object.assign({}, state, { beta: action.beta });
    case RecipeActions.AddHopAddition:
      return Object.assign({}, state, { additions: state.additions.concat(hopAddition(undefined, action)) });
    case RecipeActions.RemoveHopAddition:
      return Object.assign({}, state, { additions: state.additions.filter(a => a.id !== action.addition.id) });
    case RecipeActions.SetHopAdditionTime:
    case RecipeActions.SetHopAdditionWeight:
      return Object.assign({}, state, {
        additions: state.additions.map(a => a.id === action.addition.id ? hopAddition(a, action) : a)
      });
    default:
      return state;
  }
};

hop.create = createHop;

export default hop;
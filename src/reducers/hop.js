import {
  AddHop,
  SetHopAlpha,
  SetHopBeta,
  AddHopAddition,
  SetHopAdditionTime,
  SetHopAdditionWeight,
  RemoveHopAddition
} from '../constants/RecipeActionTypes';
import hopAddition from './hopAddition';
import { roundTo, extractRange } from '../utils/core';

function createHop(hop) {
  const alphaRange = hop.alphaRange || extractRange(hop.alpha);
  const betaRange = hop.betaRange || extractRange(hop.beta);

  return {
    id: hop.id,
    name: hop.name,
    alpha: isNaN(hop.alpha) ? roundTo(alphaRange.avg, 1) : hop.alpha,
    beta: isNaN(hop.beta) ? roundTo(betaRange.avg, 1) : hop.beta,
    additions: (hop.additions || [undefined]).map(a => hopAddition.create(a)),
    categories: typeof hop.categories === 'string' ? hop.categories.split(',') : hop.categories,
    alphaRange,
    betaRange
  };
}

const hop = (state = {}, action) => {
  switch (action.type) {
    case AddHop:
      // TODO: add boil time to action to always set new hops at max time
      return createHop(action.hop);
    case SetHopAlpha:
      return Object.assign({}, state, { alpha: action.alpha });
    case SetHopBeta:
      return Object.assign({}, state, { beta: action.beta });
    case AddHopAddition:
      return Object.assign({}, state, { additions: state.additions.concat(hopAddition(undefined, action)) });
    case RemoveHopAddition:
      return Object.assign({}, state, { additions: state.additions.filter(a => a.id !== action.addition.id) });
    case SetHopAdditionTime:
    case SetHopAdditionWeight:
      return Object.assign({}, state, {
        additions: state.additions.map(a => a.id === action.addition.id ? hopAddition(a, action) : a)
      });
    default:
      return state;
  }
};

hop.create = createHop;

export default hop;
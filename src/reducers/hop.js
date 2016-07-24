import {
  AddHop,
  SetHopAlpha,
  AddHopAddition,
  SetHopAdditionTime,
  SetHopAdditionWeight,
  RemoveHopAddition
} from '../constants/RecipeActionTypes';
import hopAddition from './hopAddition';
import { roundTo } from '../utils/core';
import _ from 'lodash';

const hop = (state = {}, action) => {
  switch (action.type) {
    case AddHop:
      return {
        id: action.hopId,
        alpha: roundTo(action.hop.alphaRange.avg, 1),
        beta: roundTo(action.hop.betaRange.avg, 1),
        alphaRange: action.hop.alphaRange,
        betaRange: action.hop.betaRange,
        name: action.hop.name,
        categories: action.hop.categories,
        additions: [hopAddition(undefined, action)]
      };
    case SetHopAlpha:
      return Object.assign({}, state, { alpha: action.alpha });
    case AddHopAddition:
      return Object.assign({}, state, { additions: state.additions.concat(hopAddition(undefined, action)) });
    case RemoveHopAddition:
      return Object.assign({}, state, { additions: state.additions.filter(a => a.id !== action.addition.id) });
    case SetHopAdditionTime:
    case SetHopAdditionWeight:
      const additions = state.additions.map(a => a.id === action.addition.id ? hopAddition(a, action) : a);
      return Object.assign({}, state, { additions });
    default:
      return state;
  }
};

export default hop;
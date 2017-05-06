import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import hopAddition from './hopAddition';
import helpers from '../utils/helpers';
import round from 'lodash/round';
import pick from 'lodash/pick';

let hopId = 0;

function createHop(hop, boilMinutes, manual = false) {
  const alphaRange = hop.alphaRange || helpers.extractRange(hop.alpha);
  const betaRange = hop.betaRange || helpers.extractRange(hop.beta);

  return (created => {
    created.additions = (hop.additions || []).map(a => hopAddition.create(a, created, boilMinutes, manual));
    return created;
  })(Object.assign(
    pick(hop, 'name', 'coHumulone', 'totalOil', 'myrcene', 'caryophyllene', 'farnesene', 'humulene', 'geraniol'), {
      id: typeof hop.id !== 'undefined' ? hop.id : ++hopId,
      alpha: isNaN(hop.alpha) ? round(alphaRange.avg, 1) : hop.alpha,
      beta: isNaN(hop.beta) ? round(betaRange.avg, 1) : hop.beta,
      form: hop.form || Defaults.HopForm,
      categories: typeof hop.categories === 'string' ? hop.categories.split(',') : hop.categories || [],
      matchScore: hop.score || 0,
      alphaRange,
      betaRange
    }
  ));
}

const hop = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.AddHop:
      return createHop(action.hop, action.boilMinutes, true);
    case RecipeActions.SetHopAlpha:
      return Object.assign({}, state, { alpha: action.alpha });
    case RecipeActions.SetHopBeta:
      return Object.assign({}, state, { beta: action.beta });
    case RecipeActions.SetHopForm:
      return Object.assign({}, state, { form: action.form });
    case RecipeActions.AddHopAddition:
      return Object.assign({}, state, { additions: state.additions.concat(hopAddition(undefined, action)) });
    case RecipeActions.RemoveHopAddition:
      return Object.assign({}, state, { additions: state.additions.filter(a => a.id !== action.addition.id) });
    case RecipeActions.SetHopAdditionType:
    case RecipeActions.SetHopAdditionTime:
    case RecipeActions.SetHopAdditionWeight:
      return Object.assign({}, state, {
        additions: state.additions.map(a => a.id === action.addition.id ? hopAddition(a, action) : a)
      });
    case RecipeActions.SetBoilTime:
      return Object.assign({} ,state, {
        additions: state.additions.map(a => hopAddition(a, action))
      });
    default:
      return state;
  }
};

hop.create = createHop;

export default hop;
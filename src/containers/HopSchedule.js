import { connect } from 'react-redux';
import actions from '../actions';
import HopSchedule from '../components/HopSchedule';
import MobileHopSchedule from '../components/_mobile/HopSchedule';
import pick from 'lodash/pick';

function mapState(state) {
  return pick(state.currentRecipe, 'hops', 'originalGravity', 'boilVolume', 'boilMinutes');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      removeHop: (hop) => dispatch(actions.recipe.removeHop(hop)),
      addAddition: (hop, boilMinutes) => dispatch(actions.recipe.addHopAddition(hop, boilMinutes)),
      setHopForm: (hop, form) => dispatch(actions.recipe.setHopForm(hop, form)),
      setAdditionType: (addition, hop, type) => dispatch(actions.recipe.setHopAdditionType(addition, hop, type)),
      setAdditionTime: (addition, hop, minutes) => dispatch(actions.recipe.setAdditionTime(addition, hop, minutes)),
      setAdditionWeight: (addition, hop, weight) => dispatch(actions.recipe.setAdditionWeight(addition, hop, weight)),
      removeAddition: (addition, hop) => dispatch(actions.recipe.removeAddition(addition, hop)),
      setAlpha: (hop, alpha) => dispatch(actions.recipe.setHopAlpha(hop, alpha)),
      setBeta: (hop, beta) => dispatch(actions.recipe.setHopBeta(hop, beta))
    }
  };
}

export default connect(mapState, mapDispatch)(HopSchedule);
export const MobileHopContainer = connect(mapState, mapDispatch)(MobileHopSchedule);
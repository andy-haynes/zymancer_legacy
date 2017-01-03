import { connect } from 'react-redux';
import actions from '../actions';
import HopSchedule from '../components/HopSchedule';
import pick from 'lodash/pick';

const { recipe } = actions;

function mapState(state) {
  return pick(state.currentRecipe, 'hops', 'originalGravity', 'boilVolume', 'boilMinutes');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      removeHop: (hop) => dispatch(recipe.removeHop(hop)),
      addAddition: (hop, boilMinutes) => dispatch(recipe.addHopAddition(hop, boilMinutes)),
      setHopForm: (hop, form) => dispatch(recipe.setHopForm(hop, form)),
      setAdditionType: (addition, hop, type) => dispatch(recipe.setHopAdditionType(addition, hop, type)),
      setAdditionTime: (addition, hop, minutes) => dispatch(recipe.setAdditionTime(addition, hop, minutes)),
      setAdditionWeight: (addition, hop, weight) => dispatch(recipe.setAdditionWeight(addition, hop, weight)),
      removeAddition: (addition, hop) => dispatch(recipe.removeAddition(addition, hop)),
      setAlpha: (hop, alpha) => dispatch(recipe.setHopAlpha(hop, alpha)),
      setBeta: (hop, beta) => dispatch(recipe.setHopBeta(hop, beta))
    }
  };
}

export default connect(mapState, mapDispatch)(HopSchedule);
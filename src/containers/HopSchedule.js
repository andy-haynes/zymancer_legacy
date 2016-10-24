import { connect } from 'react-redux';
import actions from '../actions';
import HopSchedule from '../components/HopSchedule';
import _ from 'lodash';

const { recipe } = actions;

function mapState(state) {
  return _.pick(state.currentRecipe, 'hops', 'originalGravity', 'boilVolume');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      removeHop: (hop) => dispatch(recipe.removeHop(hop)),
      addAddition: (hop) => dispatch(recipe.addAddition(hop)),
      setAdditionTime: (addition, hop, minutes) => dispatch(recipe.setAdditionTime(addition, hop, minutes)),
      setAdditionWeight: (addition, hop, weight) => dispatch(recipe.setAdditionWeight(addition, hop, weight)),
      removeAddition: (addition, hop) => dispatch(recipe.removeAddition(addition, hop)),
      setAlpha: (hop, alpha) => dispatch(recipe.setHopAlpha(hop, alpha)),
      setBeta: (hop, beta) => dispatch(recipe.setHopBeta(hop, beta))
    }
  };
}

export default connect(mapState, mapDispatch)(HopSchedule);
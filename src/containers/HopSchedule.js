import { connect } from 'react-redux';
import {
  removeHop,
  addAddition,
  setAdditionTime,
  setAdditionWeight,
  removeAddition,
  setHopAlpha,
  setHopBeta
} from '../actions/calculator';
import HopSchedule from '../components/HopSchedule';
import _ from 'lodash';

function mapState(state) {
  return _.pick(state.currentRecipe, 'hops', 'originalGravity', 'boilVolume');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      removeHop: (hop) => dispatch(removeHop(hop)),
      addAddition: (hop) => dispatch(addAddition(hop)),
      setAdditionTime: (addition, hop, minutes) => dispatch(setAdditionTime(addition, hop, minutes)),
      setAdditionWeight: (addition, hop, weight) => dispatch(setAdditionWeight(addition, hop, weight)),
      removeAddition: (addition, hop) => dispatch(removeAddition(addition, hop)),
      setAlpha: (hop, alpha) => dispatch(setHopAlpha(hop, alpha)),
      setBeta: (hop, beta) => dispatch(setHopBeta(hop, beta))
    }
  };
}

export default connect(mapState, mapDispatch)(HopSchedule);
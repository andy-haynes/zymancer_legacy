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

const mapStateToProps = (state) => ({
  hops: state.currentRecipe.hops,
  originalGravity: state.currentRecipe.originalGravity,
  boilVolume: state.currentRecipe.boilVolume
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    removeHop: (hop) => dispatch(removeHop(hop)),
    addAddition: (hop) => dispatch(addAddition(hop)),
    setAdditionTime: (addition, hop, minutes) => dispatch(setAdditionTime(addition, hop, minutes)),
    setAdditionWeight: (addition, hop, weight) => dispatch(setAdditionWeight(addition, hop, weight)),
    removeAddition: (addition, hop) => dispatch(removeAddition(addition, hop)),
    setAlpha: (hop, alpha) => dispatch(setHopAlpha(hop, alpha)),
    setBeta: (hop, beta) => dispatch(setHopBeta(hop, beta))
  }
});

const HopScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HopSchedule);

export default HopScheduleContainer;
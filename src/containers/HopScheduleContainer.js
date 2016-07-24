import { connect } from 'react-redux';
import _ from 'lodash';
import { removeHop, addAddition, setAdditionTime, setAdditionWeight, removeAddition, setHopAlpha } from '../actions';
import HopSchedule from '../components/HopSchedule';

const mapStateToProps = (state) => ({
  hops: state.recipe.hops,
  originalGravity: state.recipe.originalGravity,
  boilVolume: state.recipe.boilVolume
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeHop: (hopId) =>
      dispatch(removeHop(hopId)),
    addAddition: (hop, originalGravity, boilVolume) =>
      dispatch(addAddition(hop, originalGravity, boilVolume)),
    setAdditionTime: (addition, hop, originalGravity, boilVolume, minutes) =>
      dispatch(setAdditionTime(addition, hop, originalGravity, boilVolume, minutes)),
    setAdditionWeight: (addition, hop, originalGravity, boilVolume, weight) =>
      dispatch(setAdditionWeight(addition, hop, originalGravity, boilVolume, weight)),
    removeAddition: (addition, hop) =>
      dispatch(removeAddition(addition, hop)),
    setAlpha: (hop, originalGravity, boilVolume, alpha) =>
      dispatch(setHopAlpha(hop, originalGravity, boilVolume, alpha))
  };
};

const HopScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HopSchedule);

export default HopScheduleContainer;
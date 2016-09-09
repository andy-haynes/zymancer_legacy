import { connect } from 'react-redux';
import { removeGrain, setGrainWeight, setGrainGravity, setGrainLovibond } from '../actions/calculator';
import { SRMtoRGB, calculateSRM } from '../utils/BrewMath';
import GrainBill from '../components/GrainBill';

const mapStateToProps = (state) => ({
  grains: state.currentRecipe.grains,
  targetVolume: state.currentRecipe.targetVolume
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeGrain: (grain) => dispatch(removeGrain(grain)),
    setWeight: (grain, weight) => dispatch(setGrainWeight(grain, weight)),
    setGravity: (grain, gravity) => dispatch(setGrainGravity(grain, gravity)),
    setLovibond: (grain, lovibond) => dispatch(setGrainLovibond(grain, lovibond))
  };
};

const GrainBillContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrainBill);

export default GrainBillContainer;
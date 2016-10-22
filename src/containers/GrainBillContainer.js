import { connect } from 'react-redux';
import { removeGrain, setGrainWeight, setGrainGravity, setGrainLovibond, setGrainLintner, setGrainExtractType } from '../actions/calculator';
import GrainBill from '../components/GrainBill';

const mapStateToProps = (state) => ({
  grains: state.currentRecipe.grains,
  targetVolume: state.currentRecipe.targetVolume
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    removeGrain: (grain) => dispatch(removeGrain(grain)),
    setWeight: (grain, weight) => dispatch(setGrainWeight(grain, weight)),
    setGravity: (grain, gravity) => dispatch(setGrainGravity(grain, gravity)),
    setLovibond: (grain, lovibond) => dispatch(setGrainLovibond(grain, lovibond)),
    setLintner: (grain, lintner) => dispatch(setGrainLintner(grain, lintner)),
    setExtractType: (grain, extractType) => dispatch(setGrainExtractType(grain, extractType))
  }
});

const GrainBillContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrainBill);

export default GrainBillContainer;
import { connect } from 'react-redux';
import { removeGrain, setGrainWeight, setGrainGravity, setGrainLovibond, setGrainLintner, setGrainExtractType } from '../actions/calculator';
import GrainBill from '../components/GrainBill';
import _ from 'lodash';

function mapState(state) {
  return _.pick(state.currentRecipe, 'grains', 'targetVolume');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      removeGrain: (grain) => dispatch(removeGrain(grain)),
      setWeight: (grain, weight) => dispatch(setGrainWeight(grain, weight)),
      setGravity: (grain, gravity) => dispatch(setGrainGravity(grain, gravity)),
      setLovibond: (grain, lovibond) => dispatch(setGrainLovibond(grain, lovibond)),
      setLintner: (grain, lintner) => dispatch(setGrainLintner(grain, lintner)),
      setExtractType: (grain, extractType) => dispatch(setGrainExtractType(grain, extractType))
    }
  };
}

export default connect(mapState, mapDispatch)(GrainBill);
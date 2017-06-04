import { connect } from 'react-redux';
import actions from '../actions';
import GrainBill from '../components/GrainBill';
import MobileGrainBill from '../components/_mobile/GrainBill';
import helpers from '../utils/helpers';
import pick from 'lodash/pick';
import round from 'lodash/round';

const { recipe } = actions;

function mapState(state) {
  const { grains, targetVolume } = state.currentRecipe;
  const totalWeight = helpers.sumMeasurements(2, ...grains.map(grain => grain.weight));

  return {
    targetVolume,
    grains: grains.map(grain => Object.assign({}, grain, {
      weightPercentage: 100 * round(helpers.convertToUnit(grain.weight, totalWeight.unit).value / totalWeight.value, 2)
    }))
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      removeGrain: (grain) => dispatch(recipe.removeGrain(grain)),
      setWeight: (grain, weight) => dispatch(recipe.setGrainWeight(grain, weight)),
      setGravity: (grain, gravity) => dispatch(recipe.setGrainGravity(grain, gravity)),
      setLovibond: (grain, lovibond) => dispatch(recipe.setGrainLovibond(grain, lovibond)),
      setLintner: (grain, lintner) => dispatch(recipe.setGrainLintner(grain, lintner)),
      setExtractType: (grain, extractType) => dispatch(recipe.setGrainExtractType(grain, extractType))
    }
  };
}

export default connect(mapState, mapDispatch)(GrainBill);
export const MobileGrainContainer = connect(mapState, mapDispatch)(MobileGrainBill);
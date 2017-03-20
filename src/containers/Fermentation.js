import { connect } from 'react-redux';
import actions from '../actions';
import Fermentation from '../components/Fermentation';
import MobileFermentation from '../components/_mobile/Fermentation';
import pick from 'lodash/pick';

const { recipe } = actions;

function mapState(state) {
  return pick(state.currentRecipe, 'fermentation');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      setPitchRate: (rate) => dispatch(recipe.setPitchRate(rate)),
      removeYeast: (yeast) => dispatch(recipe.removeYeast(yeast)),
      setMfgDate: (yeast, date) => dispatch(recipe.setYeastMfgDate(yeast, date)),
      setApparentAttenuation: (yeast, attenuation) => dispatch(recipe.setYeastAttenuation(yeast, attenuation)),
      setViability: (yeast, viability) => dispatch(recipe.setYeastViability(yeast, viability)),
      setQuantity: (yeast, quantity) => dispatch(recipe.setYeastQuantity(yeast, quantity)),
      addStarterStep: (yeast, gravity, hours) => dispatch(recipe.addStarterStep(yeast, gravity, hours)),
      removeStarterStep: (yeast, step) => dispatch(recipe.removeStarterStep(yeast, step))
    }
  }
}

export default connect(mapState, mapDispatch)(Fermentation);
export const MobileFermentationContainer = connect(mapState, mapDispatch)(MobileFermentation);
import { connect } from 'react-redux';
import {
  setPitchRate,
  removeYeast,
  setYeastMfgDate,
  setYeastAttenuation,
  setYeastViability,
  setYeastQuantity,
  addStarterStep,
  removeStarterStep
} from '../actions/calculator';
import Fermentation from '../components/Fermentation';
import _ from 'lodash';

function mapState(state) {
  return _.pick(state.currentRecipe, 'fermentation');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      setPitchRate: (rate) => dispatch(setPitchRate(rate)),
      removeYeast: (yeast) => dispatch(removeYeast(yeast)),
      setMfgDate: (yeast, date) => dispatch(setYeastMfgDate(yeast, date)),
      setApparentAttenuation: (yeast, attenuation) => dispatch(setYeastAttenuation(yeast, attenuation)),
      setViability: (yeast, viability) => dispatch(setYeastViability(yeast, viability)),
      setQuantity: (yeast, quantity) => dispatch(setYeastQuantity(yeast, quantity)),
      addStarterStep: (yeast, gravity, hours) => dispatch(addStarterStep(yeast, gravity, hours)),
      removeStarterStep: (yeast, step) => dispatch(removeStarterStep(yeast, step))
    }
  }
}

export default connect(mapState, mapDispatch)(Fermentation);
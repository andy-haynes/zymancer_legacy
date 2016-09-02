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
} from '../actions';
import Fermentation from '../components/Fermentation';

const mapStateToProps = (state) => ({ ...state.recipe.fermentation });

const mapDispatchToProps = (dispatch) => {
  return {
    setPitchRate: (rate) => dispatch(setPitchRate(rate)),
    removeYeast: (yeast) => dispatch(removeYeast(yeast)),
    setMfgDate: (yeast, date) => dispatch(setYeastMfgDate(yeast, date)),
    setAttenuation: (yeast, attenuation) => dispatch(setYeastAttenuation(yeast, attenuation)),
    setViability: (yeast, viability) => dispatch(setYeastViability(yeast, viability)),
    setQuantity: (yeast, quantity) => dispatch(setYeastQuantity(yeast, quantity)),
    addStarterStep: (yeast, gravity, hours) => dispatch(addStarterStep(yeast, gravity, hours)),
    removeStarterStep: (yeast, step) => dispatch(removeStarterStep(yeast, step))
  };
};

const FermentationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fermentation);

export default FermentationContainer;
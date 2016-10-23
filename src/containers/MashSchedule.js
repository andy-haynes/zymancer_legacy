import { connect } from 'react-redux';
import {
  setMashStyle,
  setMashThickness,
  setBoilOff,
  setGrainAbsorption,
  setInfusionTemp,
  setMashoutTemp,
  setGrainTemp
} from '../actions/calculator';
import MashSchedule from '../components/MashSchedule'
import _ from 'lodash';

function mapState(state) {
  return _.pick(state.currentRecipe, 'mashSchedule');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      setStyle: (style) => dispatch(setMashStyle(style)),
      setThickness: (thickness) => dispatch(setMashThickness(thickness)),
      setBoilOff: (boilOff) => dispatch(setBoilOff(boilOff)),
      setAbsorption: (absorption) => dispatch(setGrainAbsorption(absorption)),
      setInfusionTemp: (temp) => dispatch(setInfusionTemp(temp)),
      setMashoutTemp: (temp) => dispatch(setMashoutTemp(temp)),
      setGrainTemp: (temp) => dispatch(setGrainTemp(temp))
    }
  };
}

export default connect(mapState, mapDispatch)(MashSchedule);
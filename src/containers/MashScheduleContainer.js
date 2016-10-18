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

const mapStateToProps = (state) => ({ ...state.currentRecipe.mashSchedule });

const mapDispatchToProps = (dispatch) => ({
  actions: {
    setStyle: (style) => dispatch(setMashStyle(style)),
    setThickness: (thickness) => dispatch(setMashThickness(thickness)),
    setBoilOff: (boilOff) => dispatch(setBoilOff(boilOff)),
    setAbsorption: (absorption) => dispatch(setGrainAbsorption(absorption)),
    setInfusionTemp: (temp) => dispatch(setInfusionTemp(temp)),
    setMashoutTemp: (temp) => dispatch(setMashoutTemp(temp)),
    setGrainTemp: (temp) => dispatch(setGrainTemp(temp))
  }
});

const MashScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MashSchedule);

export default MashScheduleContainer;
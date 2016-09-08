import { connect } from 'react-redux';
import {
  setMashThickness,
  setBoilOff,
  setGrainAbsorption,
  setInfusionTemp,
  setMashoutTemp,
  setGrainTemp
} from '../actions/calculator';
import MashSchedule from '../components/MashSchedule'

const mapStateToProps = (state) => ({ ...state.recipe.mashSchedule });

const mapDispatchToProps = (dispatch) => {
  return {
    setThickness: (thickness) => dispatch(setMashThickness(thickness)),
    setBoilOff: (boilOff) => dispatch(setBoilOff(boilOff)),
    setAbsorption: (absorption) => dispatch(setGrainAbsorption(absorption)),
    setInfusionTemp: (temp) => dispatch(setInfusionTemp(temp)),
    setMashoutTemp: (temp) => dispatch(setMashoutTemp(temp)),
    setGrainTemp: (temp) => dispatch(setGrainTemp(temp))
  };
};

const MashScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MashSchedule);

export default MashScheduleContainer;
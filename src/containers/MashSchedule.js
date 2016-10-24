import { connect } from 'react-redux';
import actions from '../actions';
import MashSchedule from '../components/MashSchedule'
import _ from 'lodash';

const { recipe } = actions;

function mapState(state) {
  return _.pick(state.currentRecipe, 'mashSchedule');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      setStyle: (style) => dispatch(recipe.setMashStyle(style)),
      setThickness: (thickness) => dispatch(recipe.setMashThickness(thickness)),
      setBoilOff: (boilOff) => dispatch(recipe.setBoilOff(boilOff)),
      setAbsorption: (absorption) => dispatch(recipe.setGrainAbsorption(absorption)),
      setInfusionTemp: (temp) => dispatch(recipe.setInfusionTemp(temp)),
      setMashoutTemp: (temp) => dispatch(recipe.setMashoutTemp(temp)),
      setGrainTemp: (temp) => dispatch(recipe.setGrainTemp(temp))
    }
  };
}

export default connect(mapState, mapDispatch)(MashSchedule);
import { connect } from 'react-redux';
import actions from '../actions';
import MashSchedule from '../components/MashSchedule'
import MobileMashSchedule from '../components/_mobile/MashSchedule'
import pick from 'lodash/pick';

const { recipe } = actions;

function mapState(state) {
  return pick(state.currentRecipe, 'mashSchedule');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      setStyle: (style) => dispatch(recipe.setMashStyle(style)),
      setThickness: (ratio) => dispatch(recipe.setMashThickness(ratio)),
      setBoilOff: (ratio) => dispatch(recipe.setBoilOff(ratio)),
      setAbsorption: (ratio) => dispatch(recipe.setGrainAbsorption(ratio)),
      setInfusionTemp: (temp) => dispatch(recipe.setInfusionTemp(temp)),
      setMashoutTemp: (temp) => dispatch(recipe.setMashoutTemp(temp)),
      setGrainTemp: (temp) => dispatch(recipe.setGrainTemp(temp))
    }
  };
}

export default connect(mapState, mapDispatch)(MashSchedule);
export const MobileMashContainer = connect(mapState, mapDispatch)(MobileMashSchedule);
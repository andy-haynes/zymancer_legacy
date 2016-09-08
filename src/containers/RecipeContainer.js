import { connect } from 'react-redux';
import RecipeTabs from '../components/RecipeTabs';
import {
  setRecipeName,
  setTargetVolume,
  setBoilVolume,
  setBoilTime,
  setEfficiency
} from '../actions/calculator';

const mapStateToProps = (state) => ({ recipe: state.recipe });

const mapDispatchToProps = (dispatch) => {
  return {
    setRecipeName: (name) => dispatch(setRecipeName(name)),
    setTargetVolume: (volume) => dispatch(setTargetVolume(volume)),
    setBoilVolume: (volume) => dispatch(setBoilVolume(volume)),
    setBoilTime: (minutes) => dispatch(setBoilTime(parseInt(minutes))),
    setEfficiency: (efficiency) => dispatch(setEfficiency(parseFloat(efficiency)))
  };
};

const RecipeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeTabs);

export default RecipeContainer;
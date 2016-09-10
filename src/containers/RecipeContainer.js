import { connect } from 'react-redux';
import RecipeTabs from '../components/RecipeTabs';
import {
  setRecipeName,
  setTargetVolume,
  setBoilVolume,
  setBoilTime,
  setEfficiency
} from '../actions/calculator';
import {
  saveCurrentRecipe
} from '../actions/recipes';

const mapStateToProps = (state) => ({ recipe: state.currentRecipe });

const mapDispatchToProps = (dispatch) => {
  return {
    saveRecipe: (recipe) => dispatch(saveCurrentRecipe(recipe)),
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
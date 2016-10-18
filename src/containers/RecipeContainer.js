import { connect } from 'react-redux';
import RecipeTabs from '../components/RecipeTabs';
import {
  setRecipeName,
  setRecipeStyle,
  setRecipeMethod,
  setTargetVolume,
  setBoilVolume,
  setBoilTime,
  setEfficiency
} from '../actions/calculator';
import {
  saveCurrentRecipe
} from '../actions/recipes';

const mapStateToProps = (state) => ({
  recipe: state.currentRecipe
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveRecipe: (recipe) => dispatch(saveCurrentRecipe(recipe)),
    setRecipeName: (name) => dispatch(setRecipeName(name)),
    setRecipeStyle: (style) => dispatch(setRecipeStyle(style)),
    setRecipeMethod: (method) => dispatch(setRecipeMethod(method)),
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
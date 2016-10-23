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

function mapState(state) {
  return { recipe: state.currentRecipe };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      saveRecipe: (recipe) => dispatch(saveCurrentRecipe(recipe)),
      setRecipeName: (name) => dispatch(setRecipeName(name)),
      setRecipeStyle: (style) => dispatch(setRecipeStyle(style)),
      setRecipeMethod: (method) => dispatch(setRecipeMethod(method)),
      setTargetVolume: (volume) => dispatch(setTargetVolume(volume)),
      setBoilVolume: (volume) => dispatch(setBoilVolume(volume)),
      setBoilTime: (minutes) => dispatch(setBoilTime(parseInt(minutes))),
      setEfficiency: (efficiency) => dispatch(setEfficiency(parseFloat(efficiency)))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeTabs);
import { connect } from 'react-redux';
import RecipeTabs from '../components/RecipeTabs';
import actions from '../actions';

const { recipe: recipeActions } = actions;

function mapState(state) {
  return { recipe: state.currentRecipe };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      saveRecipe: (recipe) => dispatch(recipeActions.saveCurrentRecipe(recipe)),
      setRecipeName: (name) => dispatch(recipeActions.setRecipeName(name)),
      setRecipeStyle: (styleId) => dispatch(recipeActions.loadRecipeStyle(styleId)),
      setRecipeMethod: (method) => dispatch(recipeActions.setRecipeMethod(method)),
      setTargetVolume: (volume) => dispatch(recipeActions.setTargetVolume(volume)),
      setBoilVolume: (volume) => dispatch(recipeActions.setBoilVolume(volume)),
      setBoilTime: (minutes) => dispatch(recipeActions.setBoilTime(parseInt(minutes))),
      setEfficiency: (efficiency) => dispatch(recipeActions.setEfficiency(parseFloat(efficiency)))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeTabs);
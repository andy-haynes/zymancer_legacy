import { connect } from 'react-redux';
import RecipeTabs from '../components/RecipeTabs';
import RecipeDetails from '../components/_mobile/RecipeDetails';
import actions from '../actions';

const { recipe: recipeActions } = actions;

function mapState(state) {
  return {
    recipe: state.currentRecipe,
    authenticated: state.auth.authenticated,
    isMobile: state.isMobile
  };
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
      setEfficiency: (efficiency) => dispatch(recipeActions.setEfficiency(parseFloat(efficiency))),
      clearRecipe: () => dispatch(recipeActions.clearRecipe()),
      parseRecipeText: (recipeText) => dispatch(recipeActions.parseRecipeText(recipeText)),
      setMobileTab: (tab) => dispatch(recipeActions.selectMobileTab(tab))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeTabs);
export const MobileRecipeContainer = connect(mapState, mapDispatch)(RecipeDetails);
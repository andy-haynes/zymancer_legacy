import { connect } from 'react-redux';
import RecipeParser from '../components/RecipeParser';
import actions from '../actions';

const { recipe: recipeActions } = actions;

function mapState(state) {
  return {
    parser: state.recipeParser
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      updateRecipeText: (recipeText) => dispatch(recipeActions.updateRecipeText(recipeText)),
      parseRecipeText: (recipeText) => dispatch(recipeActions.parseRecipeText(recipeText))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeParser);
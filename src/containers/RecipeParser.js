import { connect } from 'react-redux';
import RecipeParser from '../components/RecipeParser';
import actions from '../actions';

const { recipe: recipeActions } = actions;

function mapState(state) {
  return {
    parser: state.recipeParser,
    searchCache: state.ingredientSearch.cache
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      updateRecipeText: (recipeText) => dispatch(recipeActions.updateRecipeText(recipeText)),
      parseRecipeText: (recipeText, searchCache) => dispatch(recipeActions.parseRecipeText(recipeText, searchCache))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeParser);
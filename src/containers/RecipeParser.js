import { connect } from 'react-redux';
import RecipeParser from '../components/RecipeParser';
import actions from '../actions';

function mapState(state) {
  return {
    parser: state.recipeParser,
    searchCache: state.ingredientSearch.cache
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      loadParsedRecipe: (recipe) => dispatch(actions.saved.loadSavedRecipe(recipe)),
      updateRecipeText: (recipeText) => dispatch(actions.parser.updateRecipeText(recipeText)),
      parseRecipeText: (recipeText, searchCache) => dispatch(actions.parser.parseRecipeText(recipeText, searchCache))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeParser);
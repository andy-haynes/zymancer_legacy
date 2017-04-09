import { connect } from 'react-redux';
import RecipeParser from '../components/RecipeParser';
import actions from '../actions';

import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';

function mapState(state) {
  return {
    parser: state.recipeParser,
    searchCache: state.ingredientSearch.cache
  };
}

function mapDispatch(dispatch) {
  function loadParsedRecipe(recipe) {
    const takeFirstSuggestion = (ingredient) => ingredient.suggestions[0];

    recipe.grains = recipe.grains.map(takeFirstSuggestion).map(grain.create);
    recipe.hops = recipe.hops.map(takeFirstSuggestion).map(hop.create);
    recipe.fermentation = {
      yeasts: recipe.yeast.map(takeFirstSuggestion).map(yeast.create)
    };
    dispatch(actions.saved.loadSavedRecipe(recipe));
  }

  return {
    actions: {
      loadParsedRecipe,
      updateRecipeText: (recipeText) => dispatch(actions.parser.updateRecipeText(recipeText)),
      parseRecipeText: (recipeText, searchCache) => dispatch(actions.parser.parseRecipeText(recipeText, searchCache))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeParser);
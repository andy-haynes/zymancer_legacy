import { connect } from 'react-redux';
import RecipeParser from '../components/RecipeParser';
import actions from '../actions';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
import pick from 'lodash/pick';

function mapState(state) {
  return {
    parser: state.recipeParser,
    searchCache: state.ingredientSearch.cache
  };
}

function mapDispatch(dispatch) {
  function loadParsedRecipe(recipe) {
    function buildSuggestion(ingredient, overrideProps = []) {
      const selectedGrain = ingredient.suggestions[0];  //TODO take the one matched by the user
      const parsedFields = pick(ingredient, overrideProps);

      Object.keys(parsedFields).forEach(overrideKey => {
        if (parsedFields[overrideKey]) {
          selectedGrain[overrideKey] = parsedFields[overrideKey];
        }
      });

      return selectedGrain;
    }

    recipe.grains = recipe.grains.map(g => buildSuggestion(g, ['name', 'weight', 'lovibond'])).map(grain.create);
    recipe.hops = recipe.hops.map(h => buildSuggestion(h, ['name', 'alpha', 'beta', 'additions'])).map(hop.create);
    recipe.fermentation = { yeasts: recipe.yeast.map(buildSuggestion).map(yeast.create) };

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
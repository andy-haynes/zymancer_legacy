import { connect } from 'react-redux';
import RecipeParser from '../components/RecipeParser';
import actions from '../actions';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
import pick from 'lodash/pick';
import { RecipeParameter } from '../constants/AppConstants';

function mapState(state) {
  return {
    parser: state.recipeParser,
    searchCache: state.ingredientSearch.cache,
    configuration: state.configuration
  };
}

function mapDispatch(dispatch) {
  function loadParsedRecipe({ recipe, suggestions }, configuration) {
    function buildSuggestion(ingredient, key, overrideProps = []) {
      const ingredientSuggestion = suggestions[key].find(s => (s.id || s.code) === (ingredient.id || ingredient.code));
      const selectedIngredient = Object.assign({}, ingredientSuggestion.suggestions.find(s => s.active));
      const parsedFields = pick(ingredient, overrideProps);

      Object.keys(parsedFields).forEach(overrideKey => {
        if (parsedFields[overrideKey]) {
          // only take names if the selected match didn't have one
          if (overrideKey !== 'name' || selectedIngredient[overrideKey] === undefined) {
            selectedIngredient[overrideKey] = parsedFields[overrideKey];
          }
        }
      });

      const create = ({
        'grains': grain,
        'hops': hop,
        'yeast': yeast
      }[key]).create;

      return Object.assign(create(selectedIngredient, configuration), { suggestions: ingredient.suggestions });
    }

    const getParameter = (parameter) => recipe.parameters.find(p => p.parameter === parameter) || {};
    const parsedRecipe = {
      targetVolume: getParameter(RecipeParameter.TargetVolume).quantity,
      method: getParameter(RecipeParameter.BrewMethod).value,
      efficiency: getParameter(RecipeParameter.Efficiency).value,
      grains: recipe.grains.map(g => buildSuggestion(g, 'grains', ['name', 'weight', 'lovibond'])),
      hops: recipe.hops.map(h => buildSuggestion(h, 'hops', ['name', 'alpha', 'beta', 'additions'])),
      fermentation: {
        yeasts: recipe.yeast.map(y => buildSuggestion(y, 'yeast'))
      }
    };

    // clear out undefined keys
    Object.keys(parsedRecipe).forEach(k => parsedRecipe[k] === undefined && delete parsedRecipe[k]);

    return dispatch(actions.saved.loadSavedRecipe(Object.assign(recipe, parsedRecipe)));
  }

  return {
    actions: {
      loadParsedRecipe,
      clear: () => dispatch(actions.parser.clear()),
      updateRecipeText: (recipeText) => dispatch(actions.parser.updateRecipeText(recipeText)),
      selectParsedIngredient: (lineNumber) => dispatch(actions.parser.selectParsedIngredient(lineNumber)),
      parseRecipeText: (recipeText, searchCache, configuration) =>
        dispatch(actions.parser.parseRecipeText(recipeText, searchCache, configuration)),
      selectIngredientSuggestion: (ingredientKey, matchId, suggestionId) =>
        dispatch(actions.parser.selectIngredientSuggestion(ingredientKey, matchId, suggestionId))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeParser);

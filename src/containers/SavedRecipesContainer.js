import { connect } from 'react-redux';
import SavedRecipes from '../components/SavedRecipes';
import { loadSavedRecipe } from '../actions/recipes';
import { RecipeType } from '../constants/AppConstants';
import { fetchRecipesIfNeeded } from '../actions/recipes';

function mapStateToProps(state) {
  return {
    [RecipeType.SavedRecipes]: state.recipes[RecipeType.SavedRecipes],
    [RecipeType.SharedRecipes]: state.recipes[RecipeType.SharedRecipes],
    [RecipeType.PublicRecipes]: state.recipes[RecipeType.PublicRecipes]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipe: (recipeId) => dispatch(loadSavedRecipe(recipeId)),
    retrieveRecipes: (recipeType) => dispatch(fetchRecipesIfNeeded(recipeType))
  };
};

const SavedRecipesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedRecipes);

export default SavedRecipesContainer;
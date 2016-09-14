import { connect } from 'react-redux';
import SavedRecipes from '../components/SavedRecipes';
import { importRecipe } from '../actions/calculator';
import { RecipeType } from '../constants/AppConstants';

function mapStateToProps(state) {
  return {
    [RecipeType.SavedRecipes]: state.recipes[RecipeType.SavedRecipes],
    [RecipeType.SharedRecipes]: state.recipes[RecipeType.SharedRecipes],
    [RecipeType.PublicRecipes]: state.recipes[RecipeType.PublicRecipes]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipe: (recipe) => dispatch(importRecipe(recipe)),
    dispatch
  };
};

const SavedRecipesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedRecipes);

export default SavedRecipesContainer;
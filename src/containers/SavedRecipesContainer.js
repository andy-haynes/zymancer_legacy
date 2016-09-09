import { connect } from 'react-redux';
import SavedRecipes from '../components/SavedRecipes';
import { importRecipe } from '../actions/calculator';

function mapStateToProps(state) {
  return {
    isFetching: state.recipes.saved.isFetching,
    recipes: state.recipes.saved.recipes
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
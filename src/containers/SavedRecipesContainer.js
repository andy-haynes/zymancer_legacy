import { connect } from 'react-redux';
import SavedRecipes from '../components/SavedRecipes';
import { importRecipe } from '../actions';

const mapStateToProps = (state) => ({
  recipes: state.savedRecipes
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipe: (recipe) => dispatch(importRecipe(recipe))
  };
};

const SavedRecipesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedRecipes);

export default SavedRecipesContainer;
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import { importRecipe } from '../actions';

const mapStateToProps = (state) => ({
  recipes: state.savedRecipes
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipe: (id) => dispatch(importRecipe(id))
  };
};

const SavedRecipesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);

export default SavedRecipesContainer;
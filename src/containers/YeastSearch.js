import { connect } from 'react-redux';
import actions from '../actions';
import YeastSearch from '../components/YeastSearch';
import { IngredientType } from '../constants/AppConstants';

function mapState(state) {
  return { search: state.ingredientSearch[IngredientType.Yeast] };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addYeast: (yeast) => {
        dispatch(actions.recipe.addYeast(yeast));
        dispatch(actions.search.clearYeastSearch());
      },
      searchYeast: (query) => dispatch(actions.search.queryIngredients(IngredientType.Yeast, query))
    }
  };
}

export default connect(mapState, mapDispatch)(YeastSearch);
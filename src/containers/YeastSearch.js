import { connect } from 'react-redux';
import { addYeast } from '../actions/calculator';
import { queryIngredients, filterYeastResults, clearYeastSearch } from '../actions/ingredientSearch';
import YeastSearch from '../components/YeastSearch';
import { IngredientType } from '../constants/AppConstants';

function mapState(state) {
  return state.ingredientSearch[IngredientType.Yeast];
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addYeast: (yeast) => {
        dispatch(addYeast(yeast));
        dispatch(clearYeastSearch());
      },
      searchYeast: (query) => dispatch(queryIngredients(IngredientType.Yeast, query))
    }
  };
}

export default connect(mapState, mapDispatch)(YeastSearch);
import { connect } from 'react-redux';
import { addYeast } from '../actions/calculator';
import { queryIngredients, filterYeastResults, clearYeastSearch } from '../actions/ingredientSearch';
import YeastSearch from '../components/YeastSearch';
import { IngredientType } from '../constants/AppConstants';

const mapStateToProps = (state) => ({ ...state.ingredientSearch[IngredientType.Yeast] });

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addYeast: (yeast) => {
      dispatch(addYeast(yeast));
      dispatch(clearYeastSearch());
    },
    searchYeast: (query) => dispatch(queryIngredients(IngredientType.Yeast, query))
  }
});

const YeastSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(YeastSearch);

export default YeastSearchContainer;
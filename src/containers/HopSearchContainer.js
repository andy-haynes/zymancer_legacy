import { connect } from 'react-redux';
import { addHop } from '../actions/calculator';
import { queryIngredients, filterHopSearch, clearHopSearch } from '../actions/ingredientSearch';
import HopSearch from '../components/HopSearch';
import { IngredientType } from '../constants/AppConstants';

const mapStateToProps = (state) => ({
  originalGravity: state.currentRecipe.originalGravity,
  boilVolume: state.currentRecipe.boilVolume,
  ...state.ingredientSearch[IngredientType.Hop]
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addHop: (hop) => {
      dispatch(addHop(hop));
      dispatch(clearHopSearch());
    },
    searchHops: (query) => dispatch(queryIngredients(IngredientType.Hop, query))
  }
});

const HopSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HopSearch);

export default HopSearchContainer;
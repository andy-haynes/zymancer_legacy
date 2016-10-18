import { connect } from 'react-redux';
import { addGrain } from '../actions/calculator';
import { queryIngredients, clearGrainSearch } from '../actions/ingredientSearch';
import GrainSearch from '../components/GrainSearch';
import { IngredientType } from '../constants/AppConstants';

const mapStateToProps = (state) => ({ ...state.ingredientSearch[IngredientType.Grain] });

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addGrain: (grain) => {
      dispatch(addGrain(grain));
      dispatch(clearGrainSearch());
    },
    searchGrains: (query) => dispatch(queryIngredients(IngredientType.Grain, query))
  }
});

const GrainSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrainSearch);

export default GrainSearchContainer;
import { connect } from 'react-redux';
import { addGrain } from '../actions/calculator';
import { queryIngredients, clearGrainSearch } from '../actions/ingredientSearch';
import { SRMtoRGB } from '../utils/BrewMath';
import GrainSearch from '../components/GrainSearch';
import { IngredientType } from '../constants/AppConstants';

const mapStateToProps = (state) => ({ ...state.ingredientSearch[IngredientType.Grain] });

const mapDispatchToProps = (dispatch) => {
  return {
    addGrain: (grain) => {
      dispatch(addGrain(grain));
      dispatch(clearGrainSearch());
    },
    searchGrains: (query) => dispatch(queryIngredients(IngredientType.Grain, query))
  };
};

const GrainSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrainSearch);

export default GrainSearchContainer;
import { connect } from 'react-redux';
import { addGrain } from '../actions/calculator';
import { queryIngredients, clearGrainSearch } from '../actions/ingredientSearch';
import GrainSearch from '../components/GrainSearch';
import { IngredientType } from '../constants/AppConstants';

function mapState(state) {
  return state.ingredientSearch[IngredientType.Grain];
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addGrain: (grain) => {
        dispatch(addGrain(grain));
        dispatch(clearGrainSearch());
      },
      searchGrains: (query) => dispatch(queryIngredients(IngredientType.Grain, query))
    }
  };
}

export default connect(mapState, mapDispatch)(GrainSearch);
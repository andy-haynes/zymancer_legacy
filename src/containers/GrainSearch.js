import { connect } from 'react-redux';
import actions from '../actions';
import GrainSearch from '../components/GrainSearch';
import { IngredientType } from '../constants/AppConstants';

function mapState(state) {
  return state.ingredientSearch[IngredientType.Grain];
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addGrain: (grain) => {
        dispatch(actions.recipe.addGrain(grain));
        dispatch(actions.search.clearGrainSearch());
      },
      searchGrains: (query) => dispatch(actions.search.queryIngredients(IngredientType.Grain, query))
    }
  };
}

export default connect(mapState, mapDispatch)(GrainSearch);
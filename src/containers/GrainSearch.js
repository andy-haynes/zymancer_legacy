import { connect } from 'react-redux';
import actions from '../actions';
import GrainSearch from '../components/GrainSearch';
import { IngredientType } from '../constants/AppConstants';
import pick from 'lodash/pick';

function mapState(state) {
  return {
    search: Object.assign(state.ingredientSearch[IngredientType.Grain], pick(state, 'searchCache'))
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addGrain: (grain) => {
        dispatch(actions.recipe.addGrain(grain));
        dispatch(actions.search.clearGrainSearch());
      },
      searchGrains: (query, searchCache) => dispatch(actions.search.queryIngredients(IngredientType.Grain, query, searchCache.grains))
    }
  };
}

export default connect(mapState, mapDispatch)(GrainSearch);
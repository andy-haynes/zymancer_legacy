import { connect } from 'react-redux';
import actions from '../actions';
import HopSearch from '../components/HopSearch';
import { IngredientType } from '../constants/AppConstants';
import _ from 'lodash';

function mapState(state) {
  return Object.assign({},
    state.ingredientSearch[IngredientType.Hop],
    _.pick(state.currentRecipe, 'originalGravity', 'boilVolume')
  );
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addHop: (hop) => {
        dispatch(actions.recipe.addHop(hop));
        dispatch(actions.search.clearHopSearch());
      },
      searchHops: (query) => dispatch(actions.search.queryIngredients(IngredientType.Hop, query))
    }
  };
}

export default connect(mapState, mapDispatch)(HopSearch);
import { connect } from 'react-redux';
import actions from '../actions';
import HopSearch from '../components/HopSearch';
import { IngredientType } from '../constants/AppConstants';
import pick from 'lodash/pick';

function mapState(state) {
  return Object.assign({},
    { search: state.ingredientSearch[IngredientType.Hop] },
    pick(state.currentRecipe, 'boilMinutes')
  );
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addHop: (hop, boilMinutes) => {
        dispatch(actions.recipe.addHop(hop));
        dispatch(actions.recipe.addHopAddition(hop, boilMinutes));
        dispatch(actions.search.clearHopSearch());
      },
      searchHops: (query) => dispatch(actions.search.queryIngredients(IngredientType.Hop, query))
    }
  };
}

export default connect(mapState, mapDispatch)(HopSearch);
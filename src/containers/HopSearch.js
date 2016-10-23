import { connect } from 'react-redux';
import { addHop } from '../actions/calculator';
import { queryIngredients, filterHopSearch, clearHopSearch } from '../actions/ingredientSearch';
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
        dispatch(addHop(hop));
        dispatch(clearHopSearch());
      },
      searchHops: (query) => dispatch(queryIngredients(IngredientType.Hop, query))
    }
  };
}

export default connect(mapState, mapDispatch)(HopSearch);
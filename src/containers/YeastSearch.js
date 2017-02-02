import { connect } from 'react-redux';
import actions from '../actions';
import YeastSearch from '../components/YeastSearch';
import { IngredientType } from '../constants/AppConstants';
import pick from 'lodash/pick';

function mapState(state) {
  return {
    search: Object.assign({},
      state.ingredientSearch[IngredientType.Yeast],
      pick(state.searchCache)
    )
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      addYeast: (yeast) => {
        dispatch(actions.recipe.addYeast(yeast));
        dispatch(actions.search.clearYeastSearch());
      },
      searchYeast: (query, searchCache) => dispatch(actions.search.queryIngredients(IngredientType.Yeast, query, searchCache.yeast))
    }
  };
}

export default connect(mapState, mapDispatch)(YeastSearch);
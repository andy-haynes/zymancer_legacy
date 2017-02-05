import { connect } from 'react-redux';
import actions from '../actions';
import GrainSearch from '../components/GrainSearch';
import HopSearch from '../components/HopSearch';
import YeastSearch from '../components/YeastSearch';
import { IngredientType } from '../constants/AppConstants';
import pick from 'lodash/pick';

function createMapState(ingredientType, props) {
  return (state) => Object.assign({
    search: Object.assign(
      state.ingredientSearch[ingredientType],
      pick(state.ingredientSearch, 'cache')
    )
  }, (props && props(state)) || {});
}

function createMapDispatch(ingredientType, createAdd) {
  return (dispatch) => ({
    actions: {
      addIngredient: createAdd(dispatch),
      createFilter: (cache) => (query) => dispatch(actions.search.queryIngredients(ingredientType, query, cache))
    }
  });
}

function createSearchContainer(component, ingredientType, createAdd, extraProps) {
  return connect(
    createMapState(ingredientType, extraProps),
    createMapDispatch(ingredientType, createAdd)
  )(component);
}

export default {
  GrainSearch: createSearchContainer(GrainSearch, IngredientType.Grain, (dispatch) =>
    (grain) => {
      dispatch(actions.recipe.addGrain(grain));
      dispatch(actions.search.clearGrainSearch());
    }
  ),
  HopSearch: createSearchContainer(HopSearch, IngredientType.Hop, (dispatch) =>
    (hop, boilMinutes) => {
      dispatch(actions.recipe.addHop(hop));
      dispatch(actions.recipe.addHopAddition(hop, boilMinutes));
      dispatch(actions.search.clearHopSearch());
    },
    (state) => pick(state.currentRecipe, 'boilMinutes')
  ),
  YeastSearch: createSearchContainer(YeastSearch, IngredientType.Yeast, (dispatch) =>
    (yeast) => {
      dispatch(actions.recipe.addYeast(yeast));
      dispatch(actions.search.clearYeastSearch());
    }
  )
};
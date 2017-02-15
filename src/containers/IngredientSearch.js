import { connect } from 'react-redux';
import actions from '../actions';
import GrainSearch from '../components/GrainSearch';
import MobileGrainSearch from '../components/_mobile/GrainSearch';
import HopSearch from '../components/HopSearch';
import MobileHopSearch from '../components/_mobile/HopSearch';
import YeastSearch from '../components/YeastSearch';
import { IngredientType } from '../constants/AppConstants';
import pick from 'lodash/pick';

function createMapState(ingredientType, extraProps) {
  return (state, props = {}) => Object.assign({
    search: Object.assign(
      state.ingredientSearch[ingredientType],
      pick(state.ingredientSearch, 'cache')
    )
  }, props, (extraProps && extraProps(state)) || {});
}

function createMapDispatch(ingredientType, createAdd) {
  return (dispatch) => ({
    actions: {
      addIngredient: createAdd(dispatch),
      createFilter: (cache) => (query) => dispatch(actions.search.queryIngredients(ingredientType, query, cache))
    }
  });
}

const addDispatches = {
  [IngredientType.Grain]: (dispatch) =>
    (grain) => {
      dispatch(actions.recipe.addGrain(grain));
      dispatch(actions.search.clearGrainSearch());
    },
  [IngredientType.Hop]: (dispatch) =>
    (hop, boilMinutes) => {
      dispatch(actions.recipe.addHop(hop));
      dispatch(actions.recipe.addHopAddition(hop, boilMinutes));
      dispatch(actions.search.clearHopSearch());
    },
  [IngredientType.Yeast]: (dispatch) =>
    (yeast) => {
      dispatch(actions.recipe.addYeast(yeast));
      dispatch(actions.search.clearYeastSearch());
    }
};

function createSearchContainer(component, ingredientType, extraProps) {
  return connect(
    createMapState(ingredientType, extraProps),
    createMapDispatch(ingredientType, addDispatches[ingredientType])
  )(component);
}

export default {
  GrainSearch: createSearchContainer(GrainSearch, IngredientType.Grain),
  MobileGrainSearch: createSearchContainer(MobileGrainSearch, IngredientType.Grain),
  HopSearch: createSearchContainer(HopSearch, IngredientType.Hop, (state) => pick(state.currentRecipe, 'boilMinutes')),
  MobileHopSearch: createSearchContainer(MobileHopSearch, IngredientType.Hop, (state) => pick(state.currentRecipe, 'boilMinutes')),
  YeastSearch: createSearchContainer(YeastSearch, IngredientType.Yeast),
  //MobileYeastSearch: createSearchContainer(MobileYeastSearch, IngredientType.Yeast)
};
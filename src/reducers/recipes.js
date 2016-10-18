import ServerActions from '../constants/ServerActionTypes';
import { RecipeType } from '../constants/AppConstants';

function createRecipeFetchReducer(recipeType) {
  const { invalidate, request, receive } = {
    [RecipeType.SavedRecipes]:  { invalidate: ServerActions.InvalidateSavedRecipes,  request: ServerActions.RequestSavedRecipes,  receive: ServerActions.ReceiveSavedRecipes },
    [RecipeType.PublicRecipes]: { invalidate: ServerActions.InvalidatePublicRecipes, request: ServerActions.RequestPublicRecipes, receive: ServerActions.ReceivePublicRecipes },
    [RecipeType.SharedRecipes]: { invalidate: ServerActions.InvalidateSharedRecipes, request: ServerActions.RequestSharedRecipes, receive: ServerActions.ReceiveSharedRecipes }
  }[recipeType];

  const initialState = {
    isFetching: false,
    didInvalidate: true,
    recipes: []
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case invalidate:
        return Object.assign({}, state, {
          didInvalidate: true
        });
      case request:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        });
      case receive:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          recipes: action.recipes
        });
      default:
        return state;
    }
  }
}

const initialState = {
  [RecipeType.SavedRecipes]: createRecipeFetchReducer(RecipeType.SavedRecipes)(undefined, {}),
  [RecipeType.SharedRecipes]: createRecipeFetchReducer(RecipeType.SharedRecipes)(undefined, {}),
  [RecipeType.PublicRecipes]: createRecipeFetchReducer(RecipeType.PublicRecipes)(undefined, {})
};

function recipes(state = initialState, action) {
  switch (action.type) {
    case ServerActions.InvalidateSavedRecipes:
    case ServerActions.RequestSavedRecipes:
    case ServerActions.ReceiveSavedRecipes:
      return Object.assign({}, state, {
        [RecipeType.SavedRecipes]: createRecipeFetchReducer(RecipeType.SavedRecipes)(state[RecipeType.SavedRecipes], action)
      });
    case ServerActions.InvalidateSharedRecipes:
    case ServerActions.RequestSharedRecipes:
    case ServerActions.ReceiveSharedRecipes:
      return Object.assign({}, state, {
        [RecipeType.SharedRecipes]: createRecipeFetchReducer(RecipeType.SharedRecipes)(state[RecipeType.SharedRecipes], action)
      });
    case ServerActions.InvalidatePublicRecipes:
    case ServerActions.RequestPublicRecipes:
    case ServerActions.ReceivePublicRecipes:
      return Object.assign({}, state, {
        [RecipeType.PublicRecipes]: createRecipeFetchReducer(RecipeType.PublicRecipes)(state[RecipeType.PublicRecipes], action)
      });
    default:
      return state;
  }
}

export default recipes;
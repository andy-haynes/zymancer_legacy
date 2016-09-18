import {
  InvalidateSavedRecipes,
  RequestSavedRecipes,
  ReceiveSavedRecipes,
  InvalidateSharedRecipes,
  RequestSharedRecipes,
  ReceiveSharedRecipes,
  InvalidatePublicRecipes,
  RequestPublicRecipes,
  ReceivePublicRecipes
} from '../constants/ServerActionTypes';
import {
  RecipeType
} from '../constants/AppConstants';

const recipeTypeMap = {
  [RecipeType.SavedRecipes]: { invalidate: InvalidateSavedRecipes, request: RequestSavedRecipes, receive: ReceiveSavedRecipes },
  [RecipeType.SharedRecipes]: { invalidate: InvalidateSharedRecipes, request: RequestSharedRecipes, receive: ReceiveSharedRecipes },
  [RecipeType.PublicRecipes]: { invalidate: InvalidatePublicRecipes, request: RequestPublicRecipes, receive: ReceivePublicRecipes }
};

function createRecipeFetchReducer(recipeType) {
  const { invalidate, request, receive } = recipeTypeMap[recipeType];
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
    case InvalidateSavedRecipes:
    case RequestSavedRecipes:
    case ReceiveSavedRecipes:
      return Object.assign({}, state, {
        [RecipeType.SavedRecipes]: createRecipeFetchReducer(RecipeType.SavedRecipes)(state[RecipeType.SavedRecipes], action)
      });
    case InvalidateSharedRecipes:
    case RequestSharedRecipes:
    case ReceiveSharedRecipes:
      return Object.assign({}, state, {
        [RecipeType.SharedRecipes]: createRecipeFetchReducer(RecipeType.SharedRecipes)(state[RecipeType.SharedRecipes], action)
      });
    case InvalidatePublicRecipes:
    case RequestPublicRecipes:
    case ReceivePublicRecipes:
      return Object.assign({}, state, {
        [RecipeType.PublicRecipes]: createRecipeFetchReducer(RecipeType.PublicRecipes)(state[RecipeType.PublicRecipes], action)
      });
    default:
      return state;
  }
}

export default recipes;
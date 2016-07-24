const searchFactory = (filterActionType, clearActionType, filter) => {
  const initialState = {
    query: '',
    results: []
  };

  const search = (state = initialState, action) => {
    switch (action.type) {
      case filterActionType:
        return Object.assign({}, state, {
          query: action.query,
          results: filter(action.query)
        });
      case clearActionType:
        return initialState;
      default:
        return state;
    }
  };

  return search;
};

export default searchFactory;
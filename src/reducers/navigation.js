import { SetRoute } from '../actions';

const navigation = (state = { route: '/' }, action) => {
  switch (action.type) {
    case SetRoute:
      return { route: action.route };
    default:
      return state;
  }
};

export default navigation;

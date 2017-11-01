import { connect } from 'react-redux';
import actions from '../actions';
import Header from '../components/Header';
import MobileHeader from '../components/_mobile/Header';

function mapState(state) {
  return {
    activeRoute: state.navigation.route,
    authenticated: state.auth.authenticated
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      setRoute: (route) => dispatch(actions.setRoute(route)),
      setMobileTab: (tab) => dispatch(actions.recipe.selectMobileTab(tab))
    }
  };
}

export default connect(mapState, mapDispatch)(Header);
export const MobileHeaderContainer = connect(mapState, mapDispatch)(MobileHeader);

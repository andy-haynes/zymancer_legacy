import { connect } from 'react-redux';
import MobileRecipeTabs from '../components/_mobile/RecipeTabs';
import actions from '../actions';

function mapState(state) {
  return {
    activeTab: state.currentRecipe.mobileTab
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      setMobileTab: (tab) => dispatch(actions.recipe.selectMobileTab(tab))
    }
  };
}

export default connect(mapState, mapDispatch)(MobileRecipeTabs);
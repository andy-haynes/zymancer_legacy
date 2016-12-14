import { connect } from 'react-redux';
//import actions from '../actions';
import Style from '../components/Style';
import pick from 'lodash/pick';

function mapState(state) {
  return pick(state.currentRecipe, 'style');
}

function mapDispatch(dispatch) {
  return {
    actions: {
    }
  }
}

export default connect(mapState, mapDispatch)(Style);
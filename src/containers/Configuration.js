import { connect } from 'react-redux';
import actions from '../actions';
import Configuration from '../components/Configuration';
import { DefaultConfiguration } from '../reducers/configuration';
import pick from 'lodash/pick';

function mapState(state) {
  return pick(state.configuration, 'defaults', 'constants', 'formulas');
}

function mapDispatch(dispatch) {
  const defaultActions = {};
  Object.keys(DefaultConfiguration.defaults)
    .forEach(section => {
      defaultActions[section] = {};
      Object.keys(DefaultConfiguration.defaults[section])
        .forEach(key => {
          const methodName = `set${key[0].toUpperCase()}${key.slice(1)}`;
          defaultActions[section][methodName] = (value) => dispatch(actions.recipe.setDefault(section, key, value));
        });
    });
  return { actions: defaultActions };
}

export default connect(mapState, mapDispatch)(Configuration);

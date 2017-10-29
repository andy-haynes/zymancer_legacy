import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ConfigurationContainer from '../../containers/Configuration';
import s from './Configuration.css';

class Configuration extends React.PureComponent {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.setTitle('Configuration');
    return (
      <div className={s.configuration}>
        <ConfigurationContainer />
      </div>
    );
  }
}

export default withStyles(s)(Configuration);

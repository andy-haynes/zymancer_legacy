import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Equipment.css';

class Equipment extends React.PureComponent {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };


  render() {
    this.context.setTitle('Equipment Profiles');
    return (
      <div className={s.equipment}>
        equipment profiles!
      </div>
    );
  }
}

export default withStyles(s)(Equipment);

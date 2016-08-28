import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Equipment.css';

function Equipment(props, context) {
  context.setTitle('Equipment Profiles');
  return (
    <div className={s.equipment}>
      equipment profiles!
    </div>
  );
}

Equipment.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Equipment);

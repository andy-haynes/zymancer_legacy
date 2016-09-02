import React, { PropTypes } from 'react';
import RecipeContainer from '../../containers/RecipeContainer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calculator.css';

function Calculator(props, context) {
  return (
    <div className={s.calculator}>
      <RecipeContainer />
    </div>
  );
}

export default withStyles(s)(Calculator);

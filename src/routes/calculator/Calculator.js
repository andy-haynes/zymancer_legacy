import React, { PropTypes } from 'react';
import RecipeContainer from '../../containers/Recipe';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calculator.css';

const title = 'Zymancer';

function Calculator(props, context) {
  context.setTitle(title);
  return (
    <div className={s.calculator}>
      <RecipeContainer recipe={props.recipe} />
    </div>
  );
}

Calculator.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Calculator);

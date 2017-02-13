import React, { PropTypes } from 'react';
import RecipeContainer from '../../containers/Recipe';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import pick from 'lodash/pick';
import s from './Calculator.css';

const title = 'Zymancer';

function Calculator(props, context) {
  context.setTitle(title);
  return (
    <div className={s.calculator}>
      <RecipeContainer {...pick(props, 'recipe', 'isMobile')} />
    </div>
  );
}

Calculator.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Calculator);

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Parser.css';
import RecipeParserContainer from '../../containers/RecipeParser';

function Parser(props, context) {
  context.setTitle('Recipe Parser');
  return (
    <div className={s.parser}>
      <RecipeParserContainer />
    </div>
  );
}

Parser.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Parser);

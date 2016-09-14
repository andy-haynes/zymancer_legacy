import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recipes.css';
import SavedRecipesContainer from '../../containers/SavedRecipesContainer';

function Recipes(props, context) {
  context.setTitle('Saved Recipes');
  return (
    <div className={s.recipes}>
      <SavedRecipesContainer />
    </div>
  );
}

Recipes.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Recipes);

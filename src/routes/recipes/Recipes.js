import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recipes.css';

function Recipes(props, context) {
  context.setTitle('Saved Recipes');
  return (
    <div className={s.recipes}>
      recipes!
      <div>
        {props.recipes.map(recipe => (
          <div>
            <span>{recipe.name}</span>
            <span>{recipe.style}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Recipes.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Recipes);

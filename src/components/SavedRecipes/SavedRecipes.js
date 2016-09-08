import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SavedRecipes.css';
import Recipe from '../Recipe';

const SavedRecipes = ({ recipes, loadRecipe }) => (
  <div className={s.savedRecipes}>
    {recipes.map(recipe => (
      <Recipe
        key={recipe.id}
        recipe={recipe}
        loadRecipe={() => loadRecipe(recipe)}
      />
    ))}
  </div>
);

/*
SavedRecipes.propTypes = {
};
*/

export default withStyles(s)(SavedRecipes);
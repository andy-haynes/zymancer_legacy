import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recipes.css';
import SavedRecipesContainer from '../../containers/SavedRecipes';

class Recipes extends React.PureComponent {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  render() {
    context.setTitle('Saved Recipes');
    return (
      <div className={s.recipes}>
        <SavedRecipesContainer />
      </div>
    );
  }
}

export default withStyles(s)(Recipes);

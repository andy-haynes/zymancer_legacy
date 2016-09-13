import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SavedRecipes.css';
import Recipe from '../Recipe';
import { fetchSavedRecipesIfNeeded, invalidateSavedRecipes } from '../../actions/recipes';

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchSavedRecipesIfNeeded());
  }

  render() {
    return (
      <div className={s.savedRecipes}>
        {this.props.isFetching && 'looking for your objects'}

        {!this.props.isFetching && this.props.recipes && this.props.recipes.map(recipe => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            loadRecipe={() => this.props.loadRecipe(recipe)}
          />
        ))}

        {!this.props.isFetching && !this.props.recipes && `you fucked up! null? ${this.props.recipes == null} - elements? ${this.props.recipes != null && this.props.recipes.length > 0}`}
      </div>
    );
  }
}

/*
SavedRecipes.propTypes = {
};
*/

export default withStyles(s)(SavedRecipes);
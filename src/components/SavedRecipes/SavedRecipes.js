import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SavedRecipes.css';
import Recipe from '../Recipe';
import { fetchRecipesIfNeeded, invalidateSavedRecipes } from '../../actions/recipes';
import {
  RecipeType
} from '../../constants/AppConstants';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.dispatch(fetchRecipesIfNeeded(RecipeType.SavedRecipes));
  }

  render() {
    return (
      <div className={s.savedRecipes}>
        <Tabs>
          <Tab label="Saved" onActive={this.props.dispatch(fetchRecipesIfNeeded(RecipeType.SavedRecipes))}>
            <div>
              {this.props[RecipeType.SavedRecipes].isFetching && 'looking for your objects'}
              {!this.props[RecipeType.SavedRecipes].isFetching && this.props[RecipeType.SavedRecipes].recipes && this.props[RecipeType.SavedRecipes].recipes.map(recipe => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  loadRecipe={() => this.props.loadRecipe(recipe)}
                />
              ))}
              {!this.props[RecipeType.SavedRecipes].isFetching && !this.props[RecipeType.SavedRecipes].recipes && `you fucked up! null? ${this.props[RecipeType.SavedRecipes].recipes == null} - elements? ${this.props[RecipeType.SavedRecipes].recipes != null && this.props[RecipeType.SavedRecipes].recipes.length > 0}`}
            </div>
          </Tab>
          <Tab label="Shared" onActive={this.props.dispatch(fetchRecipesIfNeeded(RecipeType.SharedRecipes))}>
            <div>
              {this.props[RecipeType.SharedRecipes].isFetching && 'looking for your objects'}
              {!this.props[RecipeType.SharedRecipes].isFetching && this.props[RecipeType.SharedRecipes].recipes && this.props[RecipeType.SharedRecipes].recipes.map(recipe => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  loadRecipe={() => this.props.loadRecipe(recipe)}
                />
              ))}
              {!this.props[RecipeType.SharedRecipes].isFetching && !this.props[RecipeType.SharedRecipes].recipes && `you fucked up! null? ${this.props[RecipeType.SharedRecipes].recipes == null} - elements? ${this.props[RecipeType.SharedRecipes].recipes != null && this.props[RecipeType.SharedRecipes].recipes.length > 0}`}
            </div>
          </Tab>
          <Tab label="Public">
          </Tab>
          <Tab label="Parse">
          </Tab>
        </Tabs>
      </div>
    );
  }
}

/*
SavedRecipes.propTypes = {
};
*/

export default withStyles(s)(SavedRecipes);
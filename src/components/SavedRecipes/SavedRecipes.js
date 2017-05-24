import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SavedRecipes.css';
import Recipe from '../Recipe';
import { RecipeType } from '../../constants/AppConstants';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import FetchedItem from '../FetchedItem';

class SavedRecipes extends React.Component {
  static propTypes = {
    [RecipeType.SavedRecipes]: DefinedTypes.savedRecipes.isRequired
    //[RecipeType.SharedRecipes]: DefinedTypes.savedRecipes.isRequired,
    //[RecipeType.PublicRecipes]: DefinedTypes.savedRecipes.isRequired
  };

  render() {
    const buildRecipeSet = (recipeType) => {
      const { isFetching, recipes } = this.props[recipeType];
      return (
        <FetchedItem isFetching={isFetching} load={() => this.props.retrieveRecipes(recipeType)}>
          {!isFetching && recipes && recipes.map(recipe => (
            <div key={`recipe-container-${recipe.id}`} className="pure-g">
              <div className="pure-u-1-4"></div>
              <div className="pure-u-1-2">
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                />
              </div>
            </div>
          ))}
        </FetchedItem>
      );
    };

    return (
      <div className={s.savedRecipes}>
        {buildRecipeSet(RecipeType.SavedRecipes)}
        {/*
        <Tabs>
          <Tab label="Saved">
            {buildRecipeSet(RecipeType.SavedRecipes)}
          </Tab>
          <Tab label="Shared">
            {buildRecipeSet(RecipeType.SharedRecipes)}
          </Tab>
          <Tab label="Public">
            {buildRecipeSet(RecipeType.PublicRecipes)}
          </Tab>
          <Tab label="Parse">
          </Tab>
        </Tabs>
        */}
      </div>
    );
  }
}

export default withStyles(s)(SavedRecipes);
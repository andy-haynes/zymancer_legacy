import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import savedRecipes from './queries/savedRecipes';
import sharedRecipes from './queries/sharedRecipes';
import publicRecipes from './queries/publicRecipes';
import searchGrains from './queries/searchGrains';
import searchHops from './queries/searchHops';
import searchYeast from './queries/searchYeast';
import loadRecipe from './queries/loadRecipe';
import style from './queries/style';

import saveRecipe from './mutations/saveRecipe';

// TODO: why can't I access /graphql/mutations without getting "Must provide query string"?
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      // queries
      savedRecipes,
      sharedRecipes,
      publicRecipes,
      searchGrains,
      searchHops,
      searchYeast,
      loadRecipe,
      style,
      // mutations
      saveRecipe
    }
  })
});

export default schema;
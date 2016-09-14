import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import savedRecipes from './queries/savedRecipes';
import sharedRecipes from './queries/sharedRecipes';
import publicRecipes from './queries/publicRecipes';

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
      // mutations
      saveRecipe
    }
  })
});

export default schema;
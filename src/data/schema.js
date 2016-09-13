import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import userRecipes from './queries/userRecipes';
import sharedRecipes from './queries/sharedRecipes';

import saveRecipe from './mutations/saveRecipe';

// TODO: why can't I access /graphql/mutations without getting "Must provide query string"?
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      // queries
      userRecipes,
      sharedRecipes,
      // mutations
      saveRecipe
    }
  })
});

export default schema;
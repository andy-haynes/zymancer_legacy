import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import userRecipes from './queries/userRecipes';

import saveRecipe from './mutations/saveRecipe';

// TODO: why can't I access /graphql/mutations without getting "Must provide query string"?
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      // queries
      userRecipes,
      // mutations
      saveRecipe
    }
  })
});

export default schema;
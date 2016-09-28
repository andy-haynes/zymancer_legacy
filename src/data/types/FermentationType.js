import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} from 'graphql';

const _fields = {
  recipeId: { type: GraphQLInt },
  pitchRateMillionsMLP: { type: new GraphQLNonNull(GraphQLFloat) }
};

export const FermentationType = new GraphQLObjectType({
  name: 'FermentationType',
  fields: Object.assign({}, _fields)
});

export const FermentationInputType = new GraphQLInputObjectType({
  name: 'FermentationInputType',
  fields: Object.assign({}, _fields)
});

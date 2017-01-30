import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

const IDNamePair = new GraphQLObjectType({
  name: 'IDNamePair',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString }
  }
});

export default (new GraphQLObjectType({
  name: 'TokenizedIngredientsType',
  fields: {
    grains: { type: new GraphQLList(IDNamePair) },
    hops: { type: new GraphQLList(IDNamePair) },
    yeast: { type: new GraphQLList(IDNamePair) }
  }
}));
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

const HopType = new GraphQLObjectType({
  name: 'HopType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    aroma: { type: GraphQLString },
    categories: { type: GraphQLString },
    alpha: { type: GraphQLString },
    beta: { type: GraphQLString }
  }
});

export default HopType;
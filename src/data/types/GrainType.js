import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';

const GrainType = new GraphQLObjectType({
  name: 'GrainType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    gravity: { type: GraphQLFloat },
    lovibond: { type: GraphQLString }
  }
});

export default GrainType;

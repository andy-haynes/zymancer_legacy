import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

const YeastType = new GraphQLObjectType({
  name: 'YeastType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    flocculation: { type: GraphQLString },
    rangeF: { type: GraphQLString },
    rangeC: { type: GraphQLString },
    tolerance: { type: GraphQLString },
    attenuation: { type: GraphQLString },
    mfg: { type: GraphQLString },
    styles: { type: GraphQLString }
  }
});

export default YeastType;
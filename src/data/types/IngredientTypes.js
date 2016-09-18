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

const HopType = new GraphQLObjectType({
  name: 'HopType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    aroma: { type: GraphQLString },
    categories: { type: GraphQLString },
    alpha: { type: GraphQLString },
    beta: { type: GraphQLString }
  }
});

const YeastType = new GraphQLObjectType({
  name: 'YeastType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
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

export { GrainType, HopType, YeastType };

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} from 'graphql';

export const StyleType = new GraphQLObjectType({
  name: 'StyleType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    overallImpression: { type: GraphQLString },
    aroma: { type: GraphQLString },
    appearance: { type: GraphQLString },
    flavor: { type: GraphQLString },
    mouthfeel: { type: GraphQLString },
    comments: { type: GraphQLString },
    history: { type: GraphQLString },
    characteristics: { type: GraphQLString },
    styleComparison: { type: GraphQLString },
    ogLow: { type: GraphQLFloat },
    ogHigh: { type: GraphQLFloat },
    fgLow: { type: GraphQLFloat },
    fgHigh: { type: GraphQLFloat },
    ibuLow: { type: GraphQLFloat },
    ibuHigh: { type: GraphQLFloat },
    srmLow: { type: GraphQLFloat },
    srmHigh: { type: GraphQLFloat },
    abvLow: { type: GraphQLFloat },
    abvHigh: { type: GraphQLFloat },
    commercialExamples: { type: GraphQLString }

  }
});
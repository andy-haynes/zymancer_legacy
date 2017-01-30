import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} from 'graphql';

export function mapStyleColumns(style) {
  return {
    id: style.id,
    name: style.name,
    code: style.code,
    description: style.description,
    overallImpression: style.overall_impression,
    aroma: style.aroma,
    appearance: style.appearance,
    flavor: style.flavor,
    mouthfeel: style.mouthfeel,
    comments: style.comments,
    history: style.history,
    characteristics: style.characteristics,
    styleComparison: style.style_comparison,
    ogLow: style.og_low,
    ogHigh: style.og_high,
    fgLow: style.fg_low,
    fgHigh: style.fg_high,
    ibuLow: style.ibu_low,
    ibuHigh: style.ibu_high,
    srmLow: style.srm_low,
    srmHigh: style.srm_high,
    abvLow: style.abv_low,
    abvHigh: style.abv_high,
    commercialExamples: style.commercial_examples
  };
}

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

export const StyleInputType = new GraphQLInputObjectType({
  name: 'StyleInputType',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLInt)}
  }
});
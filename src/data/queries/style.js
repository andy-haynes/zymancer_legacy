import { GraphQLInt } from 'graphql';
import { StyleType } from '../types/StyleType';
import { BJCPStyle } from '../models';

const style = {
  type: StyleType,
  args: {
    id: { type: GraphQLInt }
  },
  async resolve({ request }, { id }) {
    return await BJCPStyle.findOne({ where: { id }})
      .then(style => ({
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
      }));
  }
};

export default style;
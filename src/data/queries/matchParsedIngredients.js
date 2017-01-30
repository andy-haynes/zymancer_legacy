import { GraphQLList, GraphQLInt } from 'graphql';
import RecipeType from '../types/RecipeType';
import ParsedTypes from '../types/ParsedTypes';
import { StyleType, StyleInputType, mapStyleColumns } from '../types/StyleType';
import { GrainSearchType, HopType, YeastSearchType } from '../types/IngredientTypes';
import { Grain, Hop, Yeast, BJCPStyle } from '../models';
import pick from 'lodash/pick';

const matchParsedIngredients = {
  type: ParsedTypes.ParsedRecipeType,
  args: {
    style: { type: StyleInputType },
    grains: { type: new GraphQLList(ParsedTypes.GrainInputType) },
    hops: { type: new GraphQLList(ParsedTypes.HopInputType) },
    yeast: { type: new GraphQLList(ParsedTypes.YeastInputType) }
  },
  async resolve({ request }, { style, grains, hops, yeast }) {
    return {
      style: style && style.id && await BJCPStyle.findOne({
        attributes: StyleType._fields,
        where: {
          id: style.id
        }
      }).then(mapStyleColumns),
      grains: await Grain.findAll({
        attributes: GrainSearchType._fields,
        where: {
          name: grains.map(g => g.name)
        }
      }),
      hops: await Hop.findAll({
        attributes: HopType._fields,
        where: {
          name: hops.map(h => h.name)
        }
      }),
      yeast: await Yeast.findAll({
        attributes: YeastSearchType._fields,
        where: {
          code: yeast.map(y => y.code)
        }
      })
    };
  }
};

export default matchParsedIngredients;
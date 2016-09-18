import { GraphQLList, GraphQLString } from 'graphql';
import { HopType } from '../types/IngredientTypes';
import { Hop } from '../models';

const searchHops = {
  type: new GraphQLList(HopType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Hop.findAll({
      attributes: Object.keys(HopType._fields),
      where: { name: { $like: `%${query}%` } }
    });
  }
};

export default searchHops;
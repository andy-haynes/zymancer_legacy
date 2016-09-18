import { GraphQLList, GraphQLString } from 'graphql';
import HopType from '../types/HopType';
import { Hop } from '../models';

const searchHops = {
  type: new GraphQLList(HopType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Hop.findAll({
      attributes: ['id', 'name', 'categories', 'aroma', 'alpha', 'beta'],
      where: { name: { $like: `%${query}%` } }
    })
  }
};

export default searchHops;
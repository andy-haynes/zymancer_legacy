import { GraphQLList, GraphQLString } from 'graphql';
import { YeastType } from '../types/IngredientTypes';
import { Yeast } from '../models';

const searchHops = {
  type: new GraphQLList(YeastType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Yeast.findAll({
      attributes: Object.keys(YeastType._fields),
      where: {
        $or: [
          { name: { $like: `%${query}%` } },
          { code: { $like: `%${query}%` } }
        ]
      }
    });
  }
};

export default searchHops;
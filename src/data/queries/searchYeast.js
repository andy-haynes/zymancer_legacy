import { GraphQLList, GraphQLString } from 'graphql';
import { YeastSearchType } from '../types/IngredientTypes';
import { Yeast } from '../models';

const searchHops = {
  type: new GraphQLList(YeastSearchType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Yeast.findAll({
      attributes: Object.keys(YeastSearchType._fields),
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
import { GraphQLList, GraphQLString } from 'graphql';
import YeastType from '../types/YeastType';
import { Yeast } from '../models';

const searchHops = {
  type: new GraphQLList(YeastType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Yeast.findAll({
      attributes: ['id', 'name', 'code', 'description', 'attenuation', 'flocculation', 'rangeF', 'rangeC', 'tolerance', 'styles', 'mfg'],
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
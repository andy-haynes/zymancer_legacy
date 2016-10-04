import { GraphQLList, GraphQLString } from 'graphql';
import { HopType } from '../types/IngredientTypes';
import { Hop } from '../models';
import { MaxSearchResults } from '../../constants/AppConstants';

const searchHops = {
  type: new GraphQLList(HopType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Hop.findAll({
      limit: MaxSearchResults,
      attributes: Object.keys(HopType._fields),
      where: { name: { $iLike: `%${query}%` } }
    });
  }
};

export default searchHops;
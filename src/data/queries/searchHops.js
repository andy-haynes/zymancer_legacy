import { GraphQLList, GraphQLInt } from 'graphql';
import { HopType } from '../types/IngredientTypes';
import { Hop } from '../models';
import { MaxSearchResults } from '../../constants/AppConstants';

const searchHops = {
  type: new GraphQLList(HopType),
  args: {
    ids: { type: new GraphQLList(GraphQLInt) }
  },
  async resolve({ request }, { ids }) {
    return await Hop.findAll({
      limit: MaxSearchResults,
      attributes: Object.keys(HopType._fields),
      where: { id: { $in: ids } }
    });
  }
};

export default searchHops;
import { GraphQLList, GraphQLInt } from 'graphql';
import { YeastSearchType } from '../types/IngredientTypes';
import { Yeast } from '../models';
import { MaxSearchResults } from '../../constants/AppConstants';

const searchHops = {
  type: new GraphQLList(YeastSearchType),
  args: {
    ids: { type: new GraphQLList(GraphQLInt) }
  },
  async resolve({ request }, { ids }) {
    return await Yeast.findAll({
      limit: MaxSearchResults,
      attributes: Object.keys(YeastSearchType._fields),
      where: {
        id: { $in: ids }
      }
    });
  }
};

export default searchHops;
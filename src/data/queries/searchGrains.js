import { GraphQLList, GraphQLInt } from 'graphql';
import { GrainSearchType } from '../types/IngredientTypes';
import { Grain } from '../models';
import { MaxSearchResults } from '../../constants/AppConstants';

const searchGrains = {
  type: new GraphQLList(GrainSearchType),
  args: {
    ids: { type: new GraphQLList(GraphQLInt) }
  },
  async resolve({ request }, { ids }) {
    return await Grain.findAll({
      limit: MaxSearchResults,
      attributes: Object.keys(GrainSearchType._fields),
      where: { id: { $in: ids } }
    });
  }
};

export default searchGrains;
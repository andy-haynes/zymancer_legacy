import { GraphQLList, GraphQLString } from 'graphql';
import { GrainSearchType } from '../types/IngredientTypes';
import { Grain } from '../models';
import { MaxSearchResults } from '../../constants/AppConstants';

const searchGrains = {
  type: new GraphQLList(GrainSearchType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Grain.findAll({
      limit: MaxSearchResults,
      attributes: ['id', 'name', 'gravity', 'lovibond'],
      where: { name: { $like: `%${query}%` } }
    });
  }
};

export default searchGrains;
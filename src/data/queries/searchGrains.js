import { GraphQLList, GraphQLString } from 'graphql';
import { GrainType } from '../types/IngredientTypes';
import { Grain } from '../models';

const searchGrains = {
  type: new GraphQLList(GrainType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Grain.findAll({
      attributes: Object.keys(GrainType._fields),
      where: { name: { $like: `%${query}%` } }
    });
  }
};

export default searchGrains;
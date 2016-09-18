import { GraphQLList, GraphQLString } from 'graphql';
import GrainType from '../types/GrainType';
import { Grain } from '../models';

const searchGrains = {
  type: new GraphQLList(GrainType),
  args: {
    query: { type: GraphQLString }
  },
  async resolve({ request }, { query }) {
    return await Grain.findAll({
      attributes: ['id', 'name', 'gravity', 'lovibond'],
      where: { name: { $like: `%${query}%` } }
    })
  }
};

export default searchGrains;
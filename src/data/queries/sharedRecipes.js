import { GraphQLList } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe, User } from '../models';

const sharedRecipes = {
  type: new GraphQLList(RecipeType),
  async resolve({ request }) {
    return await User.findOne({
      include: [{ model: Recipe, as: 'SharedRecipes' }],
      where: { id: request.user.id }
    }).then(user => user.SharedRecipes);
  }
};

export default sharedRecipes;
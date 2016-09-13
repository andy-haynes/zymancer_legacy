import { GraphQLList } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe } from '../models';

const userRecipes = {
  type: new GraphQLList(RecipeType),
  async resolve({ request }) {
    return await Recipe.findAll({
      attributes: ['id', 'name'],
      where: { ownerId: request.user.id }
    });
  }
};

export default userRecipes;
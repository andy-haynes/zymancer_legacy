import { GraphQLList } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe } from '../models';

const savedRecipes = {
  type: new GraphQLList(RecipeType),
  async resolve({ request }) {
    return await Recipe.findAll({
      attributes: ['id', 'name', 'IBU', 'ABV', 'OG', 'FG'],
      where: { ownerId: request.user.id }
    });
  }
};

export default savedRecipes;
import { GraphQLList } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe, User } from '../models';

const publicRecipes = {
  type: new GraphQLList(RecipeType),
  async resolve({ request }) {
    return await Recipe.findAll({
      where: { isPublic: true }
    });
  }
};

export default publicRecipes;
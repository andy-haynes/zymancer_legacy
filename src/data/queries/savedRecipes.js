import { GraphQLList } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe, BJCPStyle } from '../models';

const savedRecipes = {
  type: new GraphQLList(RecipeType),
  async resolve({ request }) {
    return await Recipe.findAll({
      attributes: ['id', 'name', 'IBU', 'ABV', 'OG', 'FG'],
      include: [{
        attributes: ['id', 'code', 'name'],
        model: BJCPStyle,
        as: 'style'
      }],
      where: { ownerId: request.user.id }
    });
  }
};

export default savedRecipes;
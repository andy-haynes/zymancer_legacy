import {
  GraphQLList as List,
  GraphQLInt as Int,
  GraphQLNonNull as NonNull
} from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe } from '../models';

const userRecipes = {
  type: new List(RecipeType),
  args: {
    userId: { type: new NonNull(Int) }
  },
  async resolve({ request }, { userId }) {
    return await Recipe.findAll({
      attributes: ['id', 'userId', 'name', 'style'],
      where: { '$userId$': userId }
    });
  }
};

export default userRecipes;
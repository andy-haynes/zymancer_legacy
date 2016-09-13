import {
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe } from '../models';

const recipeInputType = new GraphQLInputObjectType({
   name: 'recipe',
   fields: () => ({
     name: { type: GraphQLString }
   })
 });

const saveRecipe = {
  type: RecipeType,
  args: {
    name: { type: GraphQLString },
    style: { type: GraphQLString }
  },
  async resolve({ request }, { name, style }) {
    return await Recipe.create({
      userId: request.user.id,
      name,
      style
    });
  }
};

export default saveRecipe;
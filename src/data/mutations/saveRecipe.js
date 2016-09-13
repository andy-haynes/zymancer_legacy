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
    name: { type: GraphQLString }
  },
  async resolve({ request }, { name }) {
    return await Recipe.create({
      ownerId: request.user.id,
      name
    });
  }
};

export default saveRecipe;
import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';
import RecipeType from '../types/RecipeType';
import { GrainInputType, HopInputType, YeastInputType } from '../types/IngredientTypes';
import { Recipe, RecipeGrain, RecipeHop, RecipeYeast } from '../models';

const saveRecipe = {
  type: RecipeType,
  args: {
    name: { type: GraphQLString },
    ABV: { type: GraphQLFloat },
    IBU: { type: GraphQLFloat },
    OG: { type: GraphQLFloat },
    FG: { type: GraphQLFloat },
    grains: { type: new GraphQLList(GrainInputType) },
    hops: { type: new GraphQLList(HopInputType) },
    yeast: { type: new GraphQLList(YeastInputType) }
  },
  async resolve({ request }, { name, ABV, IBU, OG, FG, grains, hops, yeast }) {
    return await Recipe.create({
      ownerId: request.user.id,
      name,
      ABV,
      IBU,
      OG,
      FG
    }).then(recipe => {
      RecipeGrain.bulkCreate(grains.map(g => ({
        recipeId: recipe.id,
        grainId: g.id,
        lovibond: g.lovibond,
        gravity: g.gravity,
        weight: g.weight
      })));

      return recipe;
    }).then(recipe => {
      RecipeHop.bulkCreate(hops.map(h => ({
        recipeId: recipe.id,
        hopId: h.id,
        alpha: h.alpha,
        beta: h.beta,
        minutes: h.minutes,
        weight: h.weight
      })));

      return recipe;
    }).then(recipe => {
      RecipeYeast.bulkCreate(yeast.map(y => ({
        recipeId: recipe.id,
        yeastId: y.id,
        mfgDate: y.mfgDate,
        attenuation: y.attenuation,
        quantity: y.quantity
      })));

      return recipe;
    });
  }
};

export default saveRecipe;
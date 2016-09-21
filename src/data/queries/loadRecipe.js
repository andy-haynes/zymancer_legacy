import { GraphQLList, GraphQLInt } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe, RecipeIngredient, Grain, Hop, Yeast } from '../models';

const loadRecipe = {
  type: RecipeType,
  args: {
    id: { type: GraphQLInt }
  },
  async resolve({ request }, { id }) {
    return await Recipe.findOne({
      attributes: ['id', 'name'],
      include: [{
        model: Grain,
        as: 'grains'
      }, {
        model: Hop,
        as: 'hopAdditions'
      }, {
        model: Yeast,
        as: 'yeast'
      }],
      where: { id: id }
    }).then(recipe => ({
      id: recipe.id,
      name: recipe.name,
      grains: recipe.grains.map(grain => ({
        id: grain.id,
        name: grain.name,
        gravity: grain.RecipeGrains.gravity,
        lovibond: grain.RecipeGrains.lovibond,
        weight: JSON.parse(grain.RecipeGrains.weight)
      })),
      hops: recipe.hopAdditions.map(hop => ({
        id: hop.id,
        name: hop.name,
        alpha: hop.RecipeHops.alpha,
        beta: hop.RecipeHops.beta,
        categories: hop.categories,
        minutes: hop.RecipeHops.minutes,
        weight: JSON.parse(hop.RecipeHops.weight)
      })),
      yeast: recipe.yeast.map(yeast => ({
        id: yeast.id,
        name: yeast.name,
        description: yeast.description,
        mfg: yeast.mfg,
        code: yeast.code,
        rangeC: yeast.rangeC,
        rangeF: yeast.rangeF,
        tolerance: yeast.tolerance,
        mfgDate: yeast.RecipeYeast.mfgDate,
        attenuation: yeast.RecipeYeast.attenuation,
        quantity: yeast.RecipeYeast.quantity
      }))
    }));
  }
};

export default loadRecipe;
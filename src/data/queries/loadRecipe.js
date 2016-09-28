import { GraphQLList, GraphQLInt } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe, Grain, Hop, Yeast, MashSchedule, RecipeFermentation } from '../models';
import _ from 'lodash';

const loadRecipe = {
  type: RecipeType,
  args: {
    id: { type: GraphQLInt }
  },
  async resolve({ request }, { id }) {
    return await Recipe.findOne({
      attributes: ['id', 'name'],
      include: [{
        attributes: ['id', 'name'],
        model: Grain,
        as: 'grains'
      }, {
        attributes: ['id', 'name', 'alpha', 'beta', 'categories'],
        model: Hop,
        as: 'hopAdditions'
      }, {
        attributes: ['id', 'name', 'description', 'mfg', 'code', 'rangeC', 'rangeF', 'tolerance'],
        model: Yeast,
        as: 'yeast'
      }, {
        attributes: ['thickness', 'absorption', 'boilOff', 'grainTemp', 'infusionTemp', 'mashoutTemp'],
        model: MashSchedule,
        as: 'mashSchedule'
      }, {
        attributes: ['pitchRateMillionsMLP'],
        model: RecipeFermentation,
        as: 'fermentation'
      }],
      where: {
        id: id,
        $and: {
          $or: [
            { ownerId: request.user ? request.user.id : null },
            // shared with
            { isPublic: true }
          ]
        }
      }
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
      })),
      fermentation: _.pick(recipe.fermentation, 'pitchRateMillionsMLP'),
      mashSchedule: {
        thickness: JSON.parse(recipe.mashSchedule.thickness),
        absorption: JSON.parse(recipe.mashSchedule.absorption),
        boilOff: JSON.parse(recipe.mashSchedule.boilOff),
        grainTemp: JSON.parse(recipe.mashSchedule.grainTemp),
        infusionTemp: JSON.parse(recipe.mashSchedule.infusionTemp),
        mashoutTemp: JSON.parse(recipe.mashSchedule.mashoutTemp)
      }
    }));
  }
};

export default loadRecipe;
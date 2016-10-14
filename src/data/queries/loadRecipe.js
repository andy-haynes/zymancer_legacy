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
      attributes: ['id', 'name', 'style'],
      include: [{
        attributes: ['id', 'name'],
        model: Grain,
        as: 'grains'
      }, {
        attributes: ['id', 'name', 'alpha', 'beta', 'categories'],
        model: Hop,
        as: 'hopAdditions'
      }, {
        attributes: ['id', 'name', 'styles', 'description', 'mfg', 'code', 'rangeC', 'rangeF', 'tolerance', 'flocculation', 'attenuationRange'],
        model: Yeast,
        as: 'yeast'
      }, {
        attributes: ['style', 'thickness', 'absorption', 'boilOff', 'grainTemp', 'infusionTemp', 'mashoutTemp'],
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
      style: recipe.style,
      grains: recipe.grains.map(grain => ({
        id: grain.id,
        name: grain.name,
        gravity: grain.RecipeGrains.gravity,
        lovibond: grain.RecipeGrains.lovibond,
        weight: grain.RecipeGrains.weight
      })),
      hops: recipe.hopAdditions.map(hop => ({
        id: hop.id,
        name: hop.name,
        alpha: hop.RecipeHops.alpha,
        beta: hop.RecipeHops.beta,
        categories: hop.categories,
        minutes: hop.RecipeHops.minutes,
        weight: hop.RecipeHops.weight
      })),
      yeasts: recipe.yeast.map(yeast => ({
        id: yeast.id,
        name: yeast.name,
        description: yeast.description,
        styles: yeast.styles,
        mfg: yeast.mfg,
        code: yeast.code,
        rangeC: yeast.rangeC,
        rangeF: yeast.rangeF,
        tolerance: yeast.tolerance,
        mfgDate: yeast.RecipeYeast.mfgDate,
        attenuationRange: yeast.attenuationRange,
        apparentAttenuation: yeast.RecipeYeast.apparentAttenuation,
        quantity: yeast.RecipeYeast.quantity
      })),
      fermentation: _.pick(recipe.fermentation, 'pitchRateMillionsMLP'),
      mashSchedule: {
        style: recipe.mashSchedule.style,
        thickness: recipe.mashSchedule.thickness,
        absorption: recipe.mashSchedule.absorption,
        boilOff: recipe.mashSchedule.boilOff,
        grainTemp: recipe.mashSchedule.grainTemp,
        infusionTemp: recipe.mashSchedule.infusionTemp,
        mashoutTemp: recipe.mashSchedule.mashoutTemp
      }
    }));
  }
};

export default loadRecipe;
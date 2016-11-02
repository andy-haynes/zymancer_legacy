import { GraphQLList, GraphQLInt } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe, Grain, Hop, RecipeHop, Yeast, MashSchedule, RecipeFermentation } from '../models';
import pick from 'lodash/pick';

const loadRecipe = {
  type: RecipeType,
  args: {
    id: { type: GraphQLInt }
  },
  async resolve({ request }, { id }) {
    return await Recipe.findOne({
      attributes: ['id', 'name', 'style', 'method', 'volume'],
      include: [{
        attributes: ['id', 'name', 'isExtract', 'DBFG', 'DBCG'],
        model: Grain,
        as: 'grains'
      }, {
        attributes: ['id', 'name', 'alpha', 'beta', 'categories'],
        model: Hop,
        as: 'hopAdditions'
      }, {
        attributes: ['id', 'name', 'code', 'url', 'description', 'flocculation', 'temperatureLow', 'temperatureHigh', 'toleranceLow', 'toleranceHigh', 'attenuationLow', 'attenuationHigh', 'mfg'],
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
      method: recipe.method,
      volume: recipe.volume,
      grains: recipe.grains.map(grain => ({
        id: grain.id,
        name: grain.name,
        isExtract: grain.isExtract,
        DBCG: grain.DBCG,
        DBFG: grain.DBFG,
        gravity: grain.RecipeGrains.gravity,
        lovibond: grain.RecipeGrains.lovibond,
        lintner: grain.RecipeGrains.lintner,
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
        temperatureLow: yeast.temperatureLow,
        temperatureHigh: yeast.temperatureHigh,
        toleranceLow: yeast.toleranceLow,
        toleranceHigh: yeast.toleranceHigh,
        attenuationLow: yeast.attenuationLow,
        attenuationHigh: yeast.attenuationHigh,
        mfgDate: yeast.RecipeYeast.mfgDate,
        apparentAttenuation: yeast.RecipeYeast.apparentAttenuation,
        quantity: yeast.RecipeYeast.quantity
      })),
      fermentation: pick(recipe.fermentation, 'pitchRateMillionsMLP'),
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
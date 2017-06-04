import { GraphQLList, GraphQLInt } from 'graphql';
import RecipeType from '../types/RecipeType';
import { Recipe, Grain, Hop, RecipeHop, Yeast, MashSchedule, RecipeFermentation, BJCPStyle } from '../models';
import pick from 'lodash/pick';
import flatten from 'lodash/flatten';

const loadRecipe = {
  type: RecipeType,
  args: {
    id: { type: GraphQLInt }
  },
  async resolve({ request }, { id }) {
    return await Recipe.findOne({
      attributes: ['id', 'name', 'styleId', 'method', 'volume'],
      include: [{
        attributes: ['id', 'name', 'isExtract', 'DBFG', 'DBCG', 'url', 'mfg'],
        model: Grain,
        as: 'grains'
      }, {
        attributes: ['id', 'name', 'alpha', 'beta', 'categories', 'url'],
        model: Hop,
        as: 'hopAdditions',
        through: {
          attributes: ['id', 'alpha', 'beta', 'minutes', 'weight', 'form', 'type'],
          association: 'RecipeHops'
        }
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
      }, {
        model: BJCPStyle,
        as: 'style'
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
      method: recipe.method,
      volume: recipe.volume,
      grains: recipe.grains.map(grain => ({
        id: grain.id,
        name: grain.name,
        mfg: grain.mfg,
        url: grain.url,
        isExtract: grain.isExtract,
        DBCG: grain.DBCG,
        DBFG: grain.DBFG,
        gravity: grain.RecipeGrains.gravity,
        lovibond: grain.RecipeGrains.lovibond,
        lintner: grain.RecipeGrains.lintner,
        weight: grain.RecipeGrains.weight
      })),
      hops: flatten(recipe.hopAdditions.map(hop => {
        return hop.RecipeHops.map(addition => ({
          id: hop.id,
          name: hop.name,
          url: hop.url,
          alpha: addition.alpha,
          beta: addition.beta,
          categories: hop.categories,
          minutes: addition.minutes,
          weight: addition.weight,
          form: addition.form,
          type: addition.type
        }));
      })),
      yeasts: recipe.yeast.map(yeast => ({
        id: yeast.id,
        name: yeast.name,
        description: yeast.description,
        styles: yeast.styles,
        url: yeast.url,
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
      },
      style: {
        id: recipe.style.id,
        name: recipe.style.name,
        code: recipe.style.code,
        description: recipe.style.description,
        overallImpression: recipe.style.overall_impression,
        aroma: recipe.style.aroma,
        appearance: recipe.style.appearance,
        flavor: recipe.style.flavor,
        mouthfeel: recipe.style.mouthfeel,
        comments: recipe.style.comments,
        history: recipe.style.history,
        characteristics: recipe.style.characteristics,
        styleComparison: recipe.style.style_comparison,
        ogLow: recipe.style.og_low,
        ogHigh: recipe.style.og_high,
        fgLow: recipe.style.fg_low,
        fgHigh: recipe.style.fg_high,
        ibuLow: recipe.style.ibu_low,
        ibuHigh: recipe.style.ibu_high,
        srmLow: recipe.style.srm_low,
        srmHigh: recipe.style.srm_high,
        abvLow: recipe.style.abv_low,
        abvHigh: recipe.style.abv_high,
        commercialExamples: recipe.style.commercial_examples
      }
    }));
  }
};

export default loadRecipe;
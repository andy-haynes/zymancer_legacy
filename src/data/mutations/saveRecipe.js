import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';
import yeest from 'yeast';
import RecipeType from '../types/RecipeType';
import { WeightInputType, GrainInputType, HopInputType, YeastInputType } from '../types/IngredientTypes';
import { FermentationInputType } from '../types/FermentationType';
import { MashScheduleInputType } from '../types/MashScheduleType';
import { StyleInputType } from '../types/StyleType';
import { Recipe, RecipeGrain, RecipeHop, RecipeYeast, RecipeFermentation, MashSchedule } from '../models';
import pick from 'lodash/pick';

const saveRecipe = {
  type: RecipeType,
  args: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    style: { type: StyleInputType },
    method: { type: GraphQLString },
    volume: { type: WeightInputType },
    ABV: { type: GraphQLFloat },
    IBU: { type: GraphQLFloat },
    OG: { type: GraphQLFloat },
    FG: { type: GraphQLFloat },
    grains: { type: new GraphQLList(GrainInputType) },
    hops: { type: new GraphQLList(HopInputType) },
    yeasts: { type: new GraphQLList(YeastInputType) },
    mashSchedule: { type: MashScheduleInputType },
    fermentation: { type: FermentationInputType }
  },
  async resolve({ request }, { id, name, style, method, volume, ABV, IBU, OG, FG, grains, hops, yeasts, mashSchedule, fermentation }) {
    const r = { ownerId: request.user.id, name, styleId: style.id, method, volume, ABV, IBU, OG, FG };
    const existing = id > 0;
    if (existing) {
      const updated = await Recipe.update(r, { where: { id }, returning: true });
    }

    return await (existing ? Recipe.findOne({ where: { id } }) : Recipe.create(r)).then(recipe => {
      if (!existing) {
        Recipe.update({ hash: yeest.encode(recipe.id) }, { where: { id: recipe.id } });
      }

      return recipe;
    }).then(recipe => {
      if (existing) {
        RecipeGrain.destroy({ where: { recipeId: id } });
      }

      RecipeGrain.bulkCreate(grains.map(g => Object.assign(pick(g, 'lovibond', 'lintner', 'gravity', 'weight'), {
        recipeId: recipe.id,
        grainId: g.id
      })));

      return recipe;
    }).then(recipe => {
      if (existing) {
        RecipeHop.destroy({ where: { recipeId: id } });
      }

      RecipeHop.bulkCreate(hops.map(h => Object.assign(pick(h, 'alpha', 'beta', 'minutes', 'weight'), {
        recipeId: recipe.id,
        hopId: h.id
      })));

      return recipe;
    }).then(recipe => {
      if (existing) {
        RecipeYeast.destroy({ where: { recipeId: id } });
      }

      RecipeYeast.bulkCreate(yeasts.map(y => Object.assign(pick(y, 'mfgDate', 'apparentAttenuation', 'quantity'), {
        recipeId: recipe.id,
        yeastId: y.id
      })));

      return recipe;
    }).then(recipe => {
      if (existing) {
        RecipeFermentation.destroy({ where: { recipeId: id } });
      }

      RecipeFermentation.create({
        recipeId: recipe.id,
        pitchRateMillionsMLP: fermentation.pitchRateMillionsMLP
      });

      return recipe;
    }).then(recipe => {
      if (existing) {
        MashSchedule.destroy({ where: { recipeId: id } });
      }

      MashSchedule.create(Object.assign(
        pick(mashSchedule, 'style', 'thickness', 'absorption', 'boilOff', 'grainTemp', 'infusionTemp', 'mashoutTemp'),
        { recipeId: recipe.id }
      ));

      return recipe;
    });
  }
};

export default saveRecipe;
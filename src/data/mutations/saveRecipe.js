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
import { FermentationInputType } from '../types/FermentationType';
import { MashScheduleInputType } from '../types/MashScheduleType';
import { Recipe, RecipeGrain, RecipeHop, RecipeYeast, RecipeFermentation, MashSchedule } from '../models';
import _ from 'lodash';

const saveRecipe = {
  type: RecipeType,
  args: {
    name: { type: GraphQLString },
    style: { type: GraphQLString },
    method: { type: GraphQLString },
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
  async resolve({ request }, { name, style, method, ABV, IBU, OG, FG, grains, hops, yeasts, mashSchedule, fermentation }) {
    return await Recipe.create({
      ownerId: request.user.id,
      name,
      style,
      method,
      ABV,
      IBU,
      OG,
      FG
    }).then(recipe => {
      RecipeGrain.bulkCreate(grains.map(g => Object.assign(_.pick(g, 'lovibond', 'gravity', 'weight'), {
        recipeId: recipe.id,
        grainId: g.id
      })));

      return recipe;
    }).then(recipe => {
      RecipeHop.bulkCreate(hops.map(h => Object.assign(_.pick(h, 'alpha', 'beta', 'minutes', 'weight'), {
        recipeId: recipe.id,
        hopId: h.id
      })));

      return recipe;
    }).then(recipe => {
      RecipeYeast.bulkCreate(yeasts.map(y => Object.assign(_.pick(y, 'mfgDate', 'apparentAttenuation', 'quantity'), {
        recipeId: recipe.id,
        yeastId: y.id
      })));

      return recipe;
    }).then(recipe => {
      RecipeFermentation.create({
        recipeId: recipe.id,
        pitchRateMillionsMLP: fermentation.pitchRateMillionsMLP
      });

      return recipe;
    }).then(recipe => {
      MashSchedule.create(Object.assign(
        _.pick(mashSchedule, 'style', 'thickness', 'absorption', 'boilOff', 'grainTemp', 'infusionTemp', 'mashoutTemp'),
        { recipeId: recipe.id }
      ));

      return recipe;
    });
  }
};

export default saveRecipe;
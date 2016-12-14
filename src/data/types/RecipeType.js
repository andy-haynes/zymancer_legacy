import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import { WeightType, GrainType, HopAdditionType, YeastType } from './IngredientTypes';
import { MashScheduleType } from './MashScheduleType';
import { FermentationType } from './FermentationType';
import StyleType from './StyleType';

const RecipeType = new GraphQLObjectType({
  name: 'RecipeType',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    hash: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    style: { type: StyleType },
    method: { type: GraphQLString },
    volume: { type: WeightType },
    ABV: { type: new GraphQLNonNull(GraphQLFloat) },
    IBU: { type: new GraphQLNonNull(GraphQLFloat) },
    OG: { type: new GraphQLNonNull(GraphQLFloat) },
    FG: { type: new GraphQLNonNull(GraphQLFloat) },
    grains: { type: new GraphQLList(GrainType) },
    hops: { type: new GraphQLList(HopAdditionType) },
    yeasts: { type: new GraphQLList(YeastType) },
    mashSchedule: { type: MashScheduleType },
    fermentation: { type: FermentationType }
  }
});

export default RecipeType;

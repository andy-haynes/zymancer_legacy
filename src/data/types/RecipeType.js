import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import { GrainType, HopAdditionType, YeastType } from './IngredientTypes';
import { MashScheduleType } from './MashScheduleType';
import { FermentationType } from './FermentationType';

const RecipeType = new GraphQLObjectType({
  name: 'RecipeType',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    style: { type: GraphQLString },
    method: { type: GraphQLString },
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

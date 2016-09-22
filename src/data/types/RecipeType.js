import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import { GrainType, HopAdditionType, YeastType } from './IngredientTypes';

const RecipeType = new GraphQLObjectType({
  name: 'RecipeType',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    ABV: { type: new GraphQLNonNull(GraphQLFloat) },
    IBU: { type: new GraphQLNonNull(GraphQLFloat) },
    OG: { type: new GraphQLNonNull(GraphQLFloat) },
    FG: { type: new GraphQLNonNull(GraphQLFloat) },
    grains: { type: new GraphQLList(GrainType) },
    hops: { type: new GraphQLList(HopAdditionType) },
    yeast: { type: new GraphQLList(YeastType) }
  }
});

export default RecipeType;

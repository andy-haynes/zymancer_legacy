import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as Int,
  GraphQLNonNull as NonNull,
  GraphQLList
} from 'graphql';
import { GrainType, HopAdditionType, YeastType } from './IngredientTypes';

const RecipeType = new ObjectType({
  name: 'RecipeType',
  fields: {
    userId: { type: new NonNull(Int) },
    id: { type: new NonNull(Int) },
    name: { type: new NonNull(StringType) },
    grains: { type: new GraphQLList(GrainType) },
    hops: { type: new GraphQLList(HopAdditionType) },
    yeast: { type: new GraphQLList(YeastType) }
  }
});

export default RecipeType;

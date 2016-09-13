import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as Int,
  GraphQLNonNull as NonNull
} from 'graphql';

const RecipeType = new ObjectType({
  name: 'RecipeType',
  fields: {
    userId: { type: new NonNull(Int) },
    id: { type: new NonNull(Int) },
    name: { type: new NonNull(StringType) }
  }
});

export default RecipeType;

import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import { WeightInputType, GrainType, HopType, YeastType } from './IngredientTypes';

const ParsedRecipeType = new GraphQLObjectType({
  name: 'ParsedRecipeType',
  fields: {
    grains: { type: new GraphQLList(GrainType) },
    hops: { type: new GraphQLList(HopType) },
    yeast: { type: new GraphQLList(YeastType) }
  }
});

const GrainInputType = new GraphQLInputObjectType({
  name: 'ParsedGrainInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const HopInputType = new GraphQLInputObjectType({
  name: 'ParsedHopInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const YeastInputType = new GraphQLInputObjectType({
  name: 'ParsedYeastInputType',
  fields: {
    code: { type: new GraphQLNonNull(GraphQLString) }
  }
});

export default {
  GrainInputType,
  HopInputType,
  YeastInputType,
  ParsedRecipeType
};
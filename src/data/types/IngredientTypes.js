import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';

const _weightFields = {
  value: { type: GraphQLFloat },
  unit: { type: GraphQLString }
};

export const WeightType = new GraphQLObjectType({
  name: 'Weight',
  fields: _weightFields
});

export const WeightInputType = new GraphQLInputObjectType({
  name: 'WeightInput',
  fields: _weightFields
});

const _grainFields ={
  id: { type: new GraphQLNonNull(GraphQLInt) },
  gravity: { type: GraphQLFloat },
  lovibond: { type: GraphQLString }
};

export const GrainSearchType = new GraphQLObjectType({
  name: 'GrainSearchType',
  fields: Object.assign({}, _grainFields, {
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
});

export const GrainType = new GraphQLObjectType({
  name: 'GrainType',
  fields: Object.assign({}, _grainFields, {
    weight: { type: WeightType },
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
});

export const GrainInputType = new GraphQLInputObjectType({
  name: 'GrainInput',
  fields: Object.assign({}, _grainFields, {
    weight: { type: WeightInputType },
    lovibond: { type: GraphQLFloat }
  })
});

const _hopFields = {
  id: { type: new GraphQLNonNull(GraphQLInt) },
  aroma: { type: GraphQLString },
  categories: { type: GraphQLString },
  alpha: { type: GraphQLString },
  beta: { type: GraphQLString }
};

export const HopType = new GraphQLObjectType({
  name: 'HopType',
  fields: Object.assign({}, _hopFields, {
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) }
  })
});

export const HopAdditionType = new GraphQLObjectType({
  name: 'HopAdditionType',
  fields: Object.assign({}, _hopFields, {
    name: { type: new GraphQLNonNull(GraphQLString) },
    weight: { type: WeightType },
    minutes: { type: GraphQLInt }
  })
});

export const HopInputType = new GraphQLInputObjectType({
  name: 'HopInputType',
  fields: Object.assign({}, _hopFields, {
    weight: { type: WeightInputType },
    minutes: { type: GraphQLInt },
    alpha: { type: GraphQLFloat },
    beta: { type: GraphQLFloat }
  })
});

const _yeastFields = {
  id: { type: new GraphQLNonNull(GraphQLInt) },
  attenuation: { type: GraphQLString }
};

const _yeastRecipeFields = {
  mfgDate: { type: GraphQLString },
  quantity: {type: GraphQLInt },
  attenuation: {type: GraphQLFloat }
};

const _yeastFieldsDetailed = Object.assign({}, _yeastFields, {
  name: { type: new GraphQLNonNull(GraphQLString) },
  url: { type: new GraphQLNonNull(GraphQLString) },
  code: { type: GraphQLString },
  description: { type: GraphQLString },
  flocculation: { type: GraphQLString },
  rangeF: { type: GraphQLString },
  rangeC: { type: GraphQLString },
  tolerance: { type: GraphQLString },
  mfg: { type: GraphQLString },
  styles: { type: GraphQLString }
});

export const YeastSearchType = new GraphQLObjectType({
  name: 'YeastSearchType',
  fields: _yeastFieldsDetailed
});

export const YeastType = new GraphQLObjectType({
  name: 'YeastType',
  fields: Object.assign({}, _yeastFieldsDetailed, _yeastRecipeFields)
});

export const YeastInputType = new GraphQLInputObjectType({
  name: 'YeastInputType',
  fields: Object.assign({}, _yeastFields, _yeastRecipeFields)
});

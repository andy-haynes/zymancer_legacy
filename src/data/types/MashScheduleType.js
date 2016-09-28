import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

const _measurementFields = {
  value: { type: new GraphQLNonNull(GraphQLFloat) },
  unit: { type: new GraphQLNonNull(GraphQLString) }
};

const MeasurementType = new GraphQLObjectType({
  name: 'MeasurementType',
  fields: _measurementFields
});

const MeasurementInputType = new GraphQLInputObjectType({
  name: 'MeasurementInputType',
  fields: _measurementFields
});

const _ratioFields = {
  value: { type: new GraphQLNonNull(GraphQLFloat) },
  antecedent: { type: new GraphQLNonNull(GraphQLString) },
  consequent: { type: new GraphQLNonNull(GraphQLString) }
};

const RatioType = new GraphQLObjectType({
  name: 'RatioType',
  fields: _ratioFields
});

const RatioInputType = new GraphQLInputObjectType({
  name: 'RatioInputType',
  fields: _ratioFields
});

export const MashScheduleType = new GraphQLObjectType({
  name: 'MashScheduleType',
  fields: {
    recipeId: { type: new GraphQLNonNull(GraphQLInt) },
    thickness: { type: RatioType },
    absorption: { type: RatioType },
    boilOff: { type: RatioType },
    grainTemp: { type: MeasurementType },
    infusionTemp: { type: MeasurementType },
    mashoutTemp: { type: MeasurementType }
  }
});

export const MashScheduleInputType = new GraphQLInputObjectType({
  name: 'MashScheduleInputType',
  fields: {
    thickness: { type: RatioInputType },
    absorption: { type: RatioInputType },
    boilOff: { type: RatioInputType },
    grainTemp: { type: MeasurementInputType },
    infusionTemp: { type: MeasurementInputType },
    mashoutTemp: { type: MeasurementInputType }
  }
});

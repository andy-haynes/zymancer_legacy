import { GraphQLInt } from 'graphql';
import { StyleType, mapStyleColumns } from '../types/StyleType';
import { BJCPStyle } from '../models';

const style = {
  type: StyleType,
  args: {
    id: { type: GraphQLInt }
  },
  async resolve({ request }, { id }) {
    return await BJCPStyle.findOne({ where: { id }})
      .then(mapStyleColumns);
  }
};

export default style;
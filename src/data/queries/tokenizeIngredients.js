import TokenizedIngredientsType from '../types/TokenizedIngredientsType';
import { Grain, Hop, Yeast } from '../models';

const tokenizeIngredients = {
  type: TokenizedIngredientsType,
  async resolve() {
    return {
      grains: await Grain.findAll({ attributes: ['id', 'name'] }),
      hops: await Hop.findAll({ attributes: ['id', 'name'] }),
      yeast: await Yeast.findAll({ attributes: ['id', 'name', 'code'] })
    }
  }
};

export default tokenizeIngredients;
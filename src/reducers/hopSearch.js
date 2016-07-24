import { FilterHops, ClearHopSearch } from '../constants/RecipeActionTypes';
import _ from 'lodash';
import YCHHops from '../constants/YCHHops';
import searchFactory from './_searchFactory';
import { extractRange } from '../utils/core';

const resultLimit = 8;

const hopSearch = searchFactory(FilterHops, ClearHopSearch, (query) => {
  return _.take(
    YCHHops
      .filter(hop => query && hop.name.toLowerCase().includes(query.toLowerCase()))
      .map(hop => Object.assign({}, hop, {
        categoryDetails: hop.categories.map(c => c.toLowerCase()).join(', '),
        alphaRange: extractRange(hop.alpha),
        betaRange: extractRange(hop.beta)
      }))
  , resultLimit);
});

export default hopSearch;
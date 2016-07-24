import { FilterGrains, ClearGrainSearch } from '../constants/RecipeActionTypes';
import _ from 'lodash';
import GrainLookup from '../constants/GrainLookup';
import { DefaultTargetVolume } from '../constants/Defaults';
import { calculateSRM, SRMtoRGB } from '../utils/BrewMath';
import searchFactory from './_searchFactory';

const resultLimit = 8;

const grainSearch = searchFactory(FilterGrains, ClearGrainSearch, (query) => {
  return _.take(
      GrainLookup
        .filter(grain => query && grain.name.toLowerCase().includes(query.toLowerCase()))
        .map(grain => Object.assign({}, grain, { color: SRMtoRGB(calculateSRM(DefaultTargetVolume, [grain])) }))
  , resultLimit);
});

export default grainSearch;
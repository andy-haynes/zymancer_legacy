import { FilterYeast, ClearYeastSearch } from '../constants/RecipeActionTypes';
import _ from 'lodash';
import Yeast_Wyeast from '../constants/Yeast_Wyeast';
import searchFactory from './_searchFactory';

const resultLimit = 8;

const yeastSearch = searchFactory(FilterYeast, ClearYeastSearch, (query) => {
  return _.take(
      Yeast_Wyeast
        .filter(yeast => {
            const q = query.toLowerCase();
            return yeast && (
              yeast.name.toLowerCase().includes(q)  ||
              yeast.code.includes(q)
            );
        })
        .map(yeast => Object.assign({}, yeast))
  , resultLimit);
});

export default yeastSearch;
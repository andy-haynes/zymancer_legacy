import { fawcett, briess, bsg } from './Grains';
import { ych } from './Hops';
import { wyeast, whiteLabs, imperial } from './Yeast';
import pick from 'lodash/pick';
import zymath from '../utils/zymath';
import helpers from '../utils/helpers';

const grains = fawcett
  .concat(briess)
  .concat(bsg)
  .map(g => {
    const grain = Object.assign(
      pick(g, 'category', 'characteristics', 'DBFG', 'DBCG', 'description', 'flavor', 'isExtract', 'lintner', 'lovibond', 'mfg', 'name', 'url', 'usage'),
      { ingredientType: 1 }
    );

    grain.DBFG = helpers.numberOrNull(grain.DBFG);
    grain.DBCG = helpers.numberOrNull(grain.DBCG);
    grain.lintner = helpers.numberOrNull(grain.lintner);
    grain.gravity = helpers.numberOrNull(grain.DBCG || grain.DBFG) !== null ? zymath.DBFGtoGravity(helpers.numberOrNull(grain.DBCG || grain.DBFG)) : null;

    return grain;
  });

const hops = ych.map(hop => Object.assign(
  pick(hop, 'name', 'aroma', 'url', 'alpha', 'beta', 'coHumulone', 'totalOil', 'myrcene', 'caryophyllene', 'farnesene', 'humulene', 'geraniol'), {
  aroma: hop.aroma.join(','),
  categories: hop.categories.join(','),
  ingredientType: 2
}));

const yeast = Object.keys(wyeast).map(k => wyeast[k])
  .concat(Object.keys(whiteLabs).map(k => whiteLabs[k]))
  .concat(Object.keys(imperial).map(k => imperial[k]))
  .reduce((a, b) => a.concat(b), [])
  .reduce((arr, yeast) => (!arr.some(y => y.url === yeast.url && y.code === yeast.code) && arr.push(yeast) && arr) || arr, [])
  .map(y => Object.assign(y, {
    toleranceLow: (y.tolerance || y.toleranceLow) || null,
    ingredientType: 3
  }));

const Ingredients = grains.concat(yeast).concat(hops);
export default Ingredients;
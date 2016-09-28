import currentRecipe from '../reducers/currentRecipe';
import fetch from '../core/fetch';
import _ from 'lodash';

export async function getRecipe(recipeId) {
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: currentRecipe.buildLoadRecipeQuery(recipeId) }),
    credentials: 'include'
  });

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  const { data } = await resp.json();
  let { hops, yeast, fermentation } = data.loadRecipe;
  hops = hops && hops.length ? _.groupBy(hops, h => h.id) : [];

  return Object.assign({}, data.loadRecipe, {
    hops: Object.keys(hops).map(k => ({
      id: k,
      name: hops[k][0].name,
      alpha: hops[k][0].alpha,
      beta: hops[k][0].beta,
      categories: hops[k][0].categories,
      additions: hops[k].map(a => ({minutes: a.minutes, weight: a.weight}))
    })),
    fermentation: {
      pitchRate: fermentation.pitchRateMillionsMLP,
      yeasts: yeast.map(y => Object.assign({}, y, {
        mfgDate: new Date(y.mfgDate)
      }))
    }
  });
}


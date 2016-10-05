import { RecipeType } from '../constants/AppConstants';
import fetch from '../core/fetch';
import { jsonToGraphql, roundTo } from '../utils/core';
import _ from 'lodash';

async function _graphqlFetch(query) {
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query }),
    credentials: 'include'
  });

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  return await resp.json();
}

export async function getRecipe(recipeId) {
  const query = `{
    loadRecipe(id:${recipeId}) {
      id,
      name,
      style,
      grains {
        id,
        name,
        gravity,
        lovibond,
        weight {
          value,
          unit
        }
      },
      hops {
        id,
        name,
        alpha,
        beta,
        categories,
        minutes,
        weight {
          value,
          unit
        }
      },
      yeast {
        id,
        name,
        mfg,
        code,
        description,
        tolerance,
        rangeF,
        rangeC,
        mfgDate,
        attenuationRange,
        apparentAttenuation,
        quantity
      },
      fermentation {
        pitchRateMillionsMLP
      },
      mashSchedule {
        style,
        thickness { value, antecedent, consequent },
        absorption { value, antecedent, consequent },
        boilOff { value, antecedent, consequent },
        grainTemp { value, unit },
        infusionTemp { value, unit },
        mashoutTemp { value, unit }
      }
    }
  }`.replace(/\s/g, '');

  const { data } = await _graphqlFetch(query);
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

export async function saveRecipe(recipe) {
  const grains = recipe.grains.map(g => jsonToGraphql(_.pick(g, 'id', 'weight', 'lovibond', 'gravity')));
  const hops = recipe.hops.map(h => h.additions.map(a => jsonToGraphql(Object.assign(
    _.pick(a, 'alpha', 'beta', 'minutes', 'weight'),
    { id: a.hop.id }
  )))).reduce((prev, next) => prev.concat(next), []);

  const yeast = recipe.fermentation.yeasts.map(y => jsonToGraphql(Object.assign(_.pick(y, 'id', 'quantity'), {
    mfgDate: y.mfgDate.toString(),
    apparentAttenuation: roundTo(y.apparentAttenuation / 100, 2)
  })));

  const mashSchedule = jsonToGraphql(
    _.pick(recipe.mashSchedule, 'style', 'thickness', 'absorption', 'boilOff', 'grainTemp', 'infusionTemp', 'mashoutTemp')
  );

  const fermentation = jsonToGraphql({
    pitchRateMillionsMLP: recipe.fermentation.pitchRate
  });

  const query = `{
    saveRecipe(
      name:"${recipe.name}",
      style:"${recipe.style}",
      ABV:${roundTo(parseFloat(recipe.ABV), 2)},
      IBU:${roundTo(parseFloat(recipe.IBU), 2)},
      OG:${parseFloat(recipe.originalGravity)},
      FG:${parseFloat(recipe.finalGravity)},
      grains:[${grains.join(',')}],
      hops:[${hops.join(',')}],
      yeast:[${yeast.join(',')}],
      mashSchedule:${mashSchedule},
      fermentation:${fermentation}
    ) { id }
  }`;

  const { data } = await _graphqlFetch(query);
  return data.saveRecipe.id;
}

export async function getSavedRecipes(recipeType) {
  const query = {
    [RecipeType.SavedRecipes]: 'savedRecipes',
    [RecipeType.SharedRecipes]: 'sharedRecipes',
    [RecipeType.PublicRecipes]: 'publicRecipes'
  }[recipeType];
  const { data } = await _graphqlFetch(`{${query}{ id, name, style, ABV, IBU, OG, FG }}`);
  return data[query] || [];
}
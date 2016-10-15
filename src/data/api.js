import { RecipeType } from '../constants/AppConstants';
import fetch from '../core/fetch';
import { jsonToGraphql, roundTo } from '../utils/core';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
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
      yeasts {
        id,
        name,
        mfg,
        code,
        styles,
        description,
        tolerance,
        rangeF,
        rangeC,
        mfgDate,
        attenuationRange,
        apparentAttenuation,
        quantity,
        flocculation
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
  let { grains, hops, yeasts, fermentation } = data.loadRecipe;

  // group hops by id to get additions as separate property
  // TODO: group by RecipeHopId instead to get hops of the same type with different alpha/beta
  hops = hops && hops.length ? _.groupBy(hops, h => h.id) : [];
  hops = Object.keys(hops).map(k => ({
    additions: hops[k].map(a => _.pick(a, 'minutes', 'weight')),
    ...hops[k][0]
  }));

  return Object.assign({}, data.loadRecipe, {
    grains: grains.map(g => grain.create(g)),
    hops: hops.map(h => hop.create(h)),
    fermentation: {
      pitchRate: fermentation.pitchRateMillionsMLP,
      yeasts: yeasts.map(y => yeast.create(y))
    }
  });
}

export async function saveRecipe(recipe) {
  const grains = recipe.grains.map(g => jsonToGraphql(_.pick(g, 'id', 'weight', 'lovibond', 'gravity')));
  const hops = _.flatten(recipe.hops.map(h => h.additions.map(a => jsonToGraphql(Object.assign(
    _.pick(h, 'id', 'alpha', 'beta'),
    _.pick(a, 'minutes', 'weight')
  )))));

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
      yeasts:[${yeast.join(',')}],
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
import { RecipeType } from '../constants/AppConstants';
import Defaults from '../constants/Defaults';
import fetch from '../core/fetch';
import helpers from '../utils/helpers';
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
      method,
      grains {
        id,
        name,
        gravity,
        lovibond,
        lintner,
        isExtract,
        DBCG,
        DBFG,
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
  let { grains, hops, yeasts, fermentation, mashSchedule } = data.loadRecipe;

  // group hops by id to get additions as separate property
  // TODO: group by RecipeHopId instead to get hops of the same type with different alpha/beta
  hops = hops && hops.length ? _.groupBy(hops, h => h.id) : [];
  hops = Object.keys(hops).map(k => ({
    additions: hops[k].map(a => _.pick(a, 'minutes', 'weight')),
    ...hops[k][0]
  }));

  function setMeasurementRanges(measurement, defaultMeasurement) {
    // TODO: convert ratio to handle different saved units
    return Object.assign(measurement, _.pick(defaultMeasurement, 'min', 'max'));
  }

  return Object.assign({}, data.loadRecipe, {
    grains: grains.map(g => grain.create(g)),
    hops: hops.map(h => hop.create(h)),
    fermentation: {
      pitchRate: fermentation.pitchRateMillionsMLP,
      yeasts: yeasts.map(y => yeast.create(y))
    },
    mashSchedule: Object.assign({}, mashSchedule, {
      thickness: setMeasurementRanges(mashSchedule.thickness, Defaults.MashThickness),
      boilOff: setMeasurementRanges(mashSchedule.boilOff, Defaults.BoilOffRate),
      absorption: setMeasurementRanges(mashSchedule.absorption, Defaults.GrainAbsorptionLoss),
      infusionTemp: setMeasurementRanges(mashSchedule.infusionTemp, Defaults.InfusionTemp),
      mashoutTemp: setMeasurementRanges(mashSchedule.mashoutTemp, Defaults.MashoutTemp)
    })
  });
}

export async function saveRecipe(recipe) {
  const grains = recipe.grains.map(g => helpers.jsonToGraphql(_.pick(g, 'id', 'weight', 'lovibond', 'lintner', 'gravity')));
  const hops = _.flatten(recipe.hops.map(h => h.additions.map(a => helpers.jsonToGraphql(Object.assign(
    _.pick(h, 'id', 'alpha', 'beta'),
    _.pick(a, 'minutes', 'weight')
  )))));

  const yeast = recipe.fermentation.yeasts.map(y => helpers.jsonToGraphql(Object.assign(_.pick(y, 'id', 'quantity'), {
    mfgDate: y.mfgDate.toString(),
    apparentAttenuation: _.round(y.apparentAttenuation / 100, 2)
  })));

  const mashSchedule = helpers.jsonToGraphql(
    _.pick(recipe.mashSchedule, 'style', 'thickness', 'absorption', 'boilOff', 'grainTemp', 'infusionTemp', 'mashoutTemp')
  );

  const fermentation = helpers.jsonToGraphql({
    pitchRateMillionsMLP: recipe.fermentation.pitchRate
  });

  const query = `{
    saveRecipe(
      name:"${recipe.name}",
      style:"${recipe.style}",
      method:"${recipe.method}",
      ABV:${_.round(parseFloat(recipe.ABV), 2)},
      IBU:${_.round(parseFloat(recipe.IBU), 2)},
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
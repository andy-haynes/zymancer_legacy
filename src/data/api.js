import { RecipeType, RecipeParameter } from '../constants/AppConstants';
import Defaults from '../constants/Defaults';
import fetch from '../core/fetch';
import helpers from '../utils/helpers';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
import mashSchedule from '../reducers/mashSchedule';
import pick from 'lodash/pick';
import groupBy from 'lodash/groupBy';
import flatten from 'lodash/flatten';
import round from 'lodash/round';

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

const _styleKeys = `
  id,
  name,
  code,
  description,
  overallImpression,
  aroma,
  appearance,
  flavor,
  mouthfeel,
  comments,
  history,
  characteristics,
  styleComparison,
  ogLow,
  ogHigh,
  fgLow,
  fgHigh,
  ibuLow,
  ibuHigh,
  srmLow,
  srmHigh,
  abvLow,
  abvHigh,
  commercialExamples
`;

export async function getRecipe(recipeId) {
  const query = `{
    loadRecipe(id:${recipeId}) {
      id,
      name,
      style {
        id
      },
      method,
      volume {
        value,
        unit
      },
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
        form,
        type,
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
        toleranceLow,
        toleranceHigh,
        temperatureLow,
        temperatureHigh,
        mfgDate,
        attenuationLow,
        attenuationHigh,
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
  let { grains, hops, yeasts, fermentation, mashSchedule: mash } = data.loadRecipe;

  // group hops by id to get additions as separate property
  // TODO: group by RecipeHopId instead to get hops of the same type with different alpha/beta
  hops = hops && hops.length ? groupBy(hops, h => h.id) : [];
  hops = Object.keys(hops).map(k => ({
    additions: hops[k].map(a => pick(a, 'minutes', 'weight', 'type')),
    ...hops[k][0]
  }));

  mash = mashSchedule.create(mash);

  function setMeasurementRanges(measurement, defaultMeasurement) {
    // TODO: convert ratio to handle different saved units
    return Object.assign(measurement, pick(defaultMeasurement, 'min', 'max'));
  }

  return Object.assign({}, data.loadRecipe, {
    targetVolume: data.loadRecipe.volume,
    grains: grains.map(g => grain.create(g)),
    hops: hops.map(h => hop.create(h)),
    fermentation: {
      pitchRate: fermentation.pitchRateMillionsMLP,
      yeasts: yeasts.map(y => yeast.create(y))
    },
    mashSchedule: Object.assign({}, mash, {
      thickness: setMeasurementRanges(mash.thickness, Defaults.MashThickness),
      boilOff: setMeasurementRanges(mash.boilOff, Defaults.BoilOffRate),
      absorption: setMeasurementRanges(mash.absorption, Defaults.GrainAbsorptionLoss),
      infusionTemp: setMeasurementRanges(mash.infusionTemp, Defaults.InfusionTemp),
      mashoutTemp: setMeasurementRanges(mash.mashoutTemp, Defaults.MashoutTemp)
    })
  });
}

export async function saveRecipe(recipe) {
  const grains = recipe.grains.map(g => helpers.jsonToGraphql(pick(g, 'id', 'weight', 'lovibond', 'lintner', 'gravity')));
  const hops = flatten(recipe.hops.map(h => h.additions.map(a => helpers.jsonToGraphql(Object.assign(
    pick(h, 'id', 'alpha', 'beta', 'form'),
    pick(a, 'minutes', 'weight', 'type')
  )))));

  const yeast = recipe.fermentation.yeasts.map(y => helpers.jsonToGraphql(Object.assign(pick(y, 'id', 'quantity'), {
    mfgDate: y.mfgDate.toString(),
    apparentAttenuation: round(y.apparentAttenuation / 100, 2)
  })));

  const cleanMeasurement = (measurement) => pick(measurement, 'value', 'unit');
  const cleanRatio = (ratio) => pick(ratio, 'value', 'antecedent', 'consequent');

  const volume = helpers.jsonToGraphql(cleanMeasurement(recipe.targetVolume));
  const mashSchedule = helpers.jsonToGraphql(Object.assign(
    pick(recipe.mashSchedule, 'style'),
    { thickness: cleanRatio(recipe.mashSchedule.thickness) },
    { absorption: cleanRatio(recipe.mashSchedule.absorption) },
    { boilOff: cleanRatio(recipe.mashSchedule.boilOff) },
    { grainTemp: cleanMeasurement(recipe.mashSchedule.grainTemp) },
    { infusionTemp: cleanMeasurement(recipe.mashSchedule.infusionTemp) },
    { mashoutTemp: cleanMeasurement(recipe.mashSchedule.mashoutTemp) }
  ));

  const fermentation = helpers.jsonToGraphql({
    pitchRateMillionsMLP: recipe.fermentation.pitchRate
  });

  const style = helpers.jsonToGraphql({
    id: recipe.style.id
  });

  const query = `{
    saveRecipe(
      id:${recipe.id || -1},
      name:"${recipe.name}",
      style:${style},
      method:"${recipe.method}",
      volume:${volume},
      ABV:${round(parseFloat(recipe.ABV), 2)},
      IBU:${round(parseFloat(recipe.IBU), 2)},
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
  const { data } = await _graphqlFetch(`{${query}{ id, name, style { id, code, name }, ABV, IBU, OG, FG }}`);
  return data[query] || [];
}

export async function getStyle(styleId) {
  return await _graphqlFetch(`{style(id:${styleId}) { ${_styleKeys} }}`);
}

export async function buildParsedRecipe(parsed) {
  const [parsedGrains, parsedHops, parsedYeast] = [
    parsed.grains.map(g => helpers.jsonToGraphql(pick(g, 'name'))),
    parsed.hops.map(h => helpers.jsonToGraphql(pick(h, 'name'))),
    parsed.yeast.map(y => helpers.jsonToGraphql(pick(y, 'code')))
  ].map(p => [...new Set(p)]);

  const query = `{
    matchParsedIngredients(
      grains: [${parsedGrains}],
      hops: [${parsedHops}],
      yeast: [${parsedYeast}]
    ) {
      grains {
        id,
        name,
        gravity,
        lovibond,
        lintner,
        isExtract,
        DBCG,
        DBFG
      },
      hops {
        id,
        name,
        alpha,
        beta,
        categories
      },
      yeast {
        id,
        name,
        mfg,
        code,
        styles,
        description,
        toleranceLow,
        toleranceHigh,
        temperatureLow,
        temperatureHigh,
        attenuationLow,
        attenuationHigh,
        apparentAttenuation,
        flocculation
      }
    }
  }`;

  const { data } = await _graphqlFetch(query);
  const recipe = data.matchParsedIngredients;

  parsed.parameters.forEach(p => {
    switch (p.parameter) {
      case RecipeParameter.BoilTime:
        recipe.boilMinutes = p.quantity.value;
        break;
      case RecipeParameter.BrewMethod:
        recipe.brewMethod = p.quantity.value;
        break;
      case RecipeParameter.Efficiency:
        recipe.efficiency = p.value;
        break;
      case RecipeParameter.TargetVolume:
        recipe.targetVolume = Object.assign({}, Defaults.TargetVolume, p.quantity);
        break;
      //case RecipeParameter.Attenuation:
      //  break;
      // what to do with calculated values?
      //case RecipeParameter.BoilVolume:
      //case RecipeParameter.FinalGravity:
      //case RecipeParameter.OriginalGravity:
      //case RecipeParameter.IBU:
      //case RecipeParameter.SRM:
      //case RecipeParameter.ABV:
    }
  });

  function mergeIngredients(ingredients, retrieved, compare, create) {
    if (ingredients) {
      return ingredients.map(i => {
        const matching = retrieved && retrieved.find(r => compare(i, r));
        if (matching) {
          return Object.assign({}, matching, i);
        }
        return i;
      }).map(i => create(i));
    }

    return [];
  }

  const grains = mergeIngredients(parsed.grains, recipe.grains, (x, y) => x.name === y.name, grain.create);
  let hops = mergeIngredients(parsed.hops, recipe.hops, (x, y) => x.name === y.name, hop.create);
  const yeasts = mergeIngredients(parsed.yeast, recipe.yeast, (x, y) => x.code === y.code, yeast.create);

  hops = hops && hops.length ? groupBy(hops, h => h.id) : [];
  hops = Object.keys(hops).map(k => hop.create({
    additions: hops[k].map(a => pick(a, 'minutes', 'weight', 'type')),
    ...hops[k][0]
  }));

  return Object.assign(recipe, {
    grains,
    hops,
    fermentation: {
      pitchRate: Defaults.PitchRate,
      yeasts
    }
  });
}
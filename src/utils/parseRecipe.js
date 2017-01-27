import SRMColors from '../constants/SRMColors';
import Units from '../constants/Units';
import helpers from './helpers';
import { ExtractGravity, HopAdditionType, HopForm, RecipeParameter } from '../constants/AppConstants';
import Defaults from '../constants/Defaults';
import round from 'lodash/round';
import sumBy from 'lodash/sumBy';
import pick from 'lodash/pick';

const _rxNamedQty = /((?:[0-9]+[.]?[0-9]*)\s*(?:lbs|lb|oz|kg|tsp|tbsp|liter|l|gallon|gal|quart|g|qt))[.]?(?: \((?:[0-9]+[.]?[0-9]*)\s*(?:lbs|lb|oz|kg|tsp|tbsp|liter|l|gallon|gal|quart|g|qt)[.]?\))?\s{1,3}([ a-z®äöüß0-9\-\"/]+[a-z®äöüß\"])/i;
const _rxTime = /((?:[0-9]+[.]?[0-9]*)\s*(?:minutes|minute|min|hours|hour|hr))/i;
const _rxAlpha = /([0-9]+[.]?[0-9]*)\s*[%]?\s*(?:aa|aau|alpha|a.a.)/i;
const _rxIBU = /([0-9]+[.]?[0-9]*)\s*[%]?\s*(?:IBU)/i;
const _rxPercent = /([0-9]+[.]?[0-9]*)(?:\s*%)/i;
const _rxLovibond = /([0-9]+[.]?[0-9]*)°\s*(?:Lovibond|Lov|L)/i;
const _rxHopForm = /(pellet|whole leaf|whole|leaf)/i;
const _rxHopAddition = /(dry hop|dry-hop|dry|hopback|hop-back|whirlpool|whirl-pool|whirl pool|hopstand|hop-stand|hop stand)/i;
const _rxGravity = /(1\.[0-9]{3})/i;
const _rxPlato = /([0-9]+[.]?[0-9]*)°\s*(?:Plato|P)/i;
const _rxPPG = /([0-9]+[.]?[0-9]*)\s*(?:PPG)/i;
const _rxSRM = /([0-9]+[.]?[0-9]*)\s*SRM/i;
const _rxYeast = /(?:(white labs|wyeast|wyeast labs|safale|imperial|imperial yeast)\s*((?:wlp|[a-z]|us-)?\d{2,6}(?:-pc)?)|((?:wlp|us-)\d{2,6}(?:-pc)?))/i;
const _rxSoleNumeric = /([0-9]+[.]?[0-9]*)\s+(?!SG|%|SRM|IBU|lbs|lb|oz|kg|tsp|tbsp|liter|l|gallon|gal|quart|g|qt|minutes|minute|min|hours|hour|hr|aa|aau|alpha|a.a.|Lovibond|Lov|L)/ig;
const _rxRecipeParameter = /(boil time|boiling time|batch size|yield|boil size|original gravity|final gravity|terminal gravity|og|fg|attenuation|srm|color|ibu|ibus|bitterness|plato|efficiency|abv|alcohol by volume|alcohol by vol)[ a-z()=:]+((?:[0-9]+[.]?[0-9]*)[°]?\s*(?:%|minutes|minute|min|sg|ibu|srm|gallons|gallon|gal|us gallons|us gallon|us gal)?)/i;

const _unitMapping = {
  'lbs': Units.Pound,
  'lb': Units.Pound,
  'oz': Units.Ounce,
  'kg': Units.Kilogram,
  //'tsp': Units.Teaspoon,
  //'tbsp': Units.Tablespoon,
  'liter': Units.Liter,
  'l': Units.Liter,
  'gallon': Units.Gallon,
  'gal': Units.Gallon,
  'quart': Units.Quart,
  'qt': Units.Quart,
  'g': Units.Gram,
  'minutes': Units.Minute,
  'minute': Units.Minute,
  'min': Units.Minute,
  'hours': Units.Hour,
  'hour': Units.Hour,
  'hr': Units.Hour
};

const _hopAdditionMapping = {
  'pellet': HopForm.Pellet,
  'whole leaf': HopForm.Leaf,
  'whole': HopForm.Leaf,
  'leaf': HopForm.Leaf,
  'dry hop': HopAdditionType.Dry,
  'dry-hop': HopAdditionType.Dry,
  'dry': HopAdditionType.Dry,
  'hopback': HopAdditionType.HopBack,
  'hop-back': HopAdditionType.HopBack,
  'whirlpool': HopAdditionType.Whirlpool,
  'whirl-pool': HopAdditionType.Whirlpool,
  'whirl pool': HopAdditionType.Whirlpool,
  'hopstand': HopAdditionType.Whirlpool,
  'hop-stand': HopAdditionType.Whirlpool,
  'hop stand': HopAdditionType.Whirlpool
};

const _parameterMapping = {
  'boil time': RecipeParameter.BoilTime,
  'boiling time': RecipeParameter.BoilTime,
  'batch size': RecipeParameter.TargetVolume,
  'yield': RecipeParameter.TargetVolume,
  'boil size': RecipeParameter.BoilVolume,
  'original gravity': RecipeParameter.OriginalGravity,
  'final gravity': RecipeParameter.FinalGravity,
  'terminal gravity': RecipeParameter.FinalGravity,
  'og': RecipeParameter.OriginalGravity,
  'fg': RecipeParameter.FinalGravity,
  'attenuation': RecipeParameter.Attenuation,
  'srm': RecipeParameter.SRM,
  'color': RecipeParameter.SRM,
  'ibu': RecipeParameter.IBU,
  'ibus': RecipeParameter.IBU,
  'bitterness': RecipeParameter.IBU,
  //'plato': RecipeParameter.Plato,
  'efficiency': RecipeParameter.Efficiency,
  'abv': RecipeParameter.ABV,
  'alcohol by volume': RecipeParameter.ABV,
  'alcohol by vol': RecipeParameter.ABV
};

function parseLine(line) {
  const match = _rxNamedQty.exec(line);

  if (match) {
    const extractGroup = (regex) => ((m) => m && m[1].trim())(regex.exec(line));

    const parsed = {
      quantity: match[1],
      name: match[2].trim(),
      alpha: extractGroup(_rxAlpha),
      ibu: extractGroup(_rxIBU),
      hopForm: extractGroup(_rxHopForm),
      hopAddition: extractGroup(_rxHopAddition),
      time: extractGroup(_rxTime),
      percentage: extractGroup(_rxPercent),
      lovibond: extractGroup(_rxLovibond),
      srm: extractGroup(_rxSRM),
      gravity: extractGroup(_rxGravity),
      plato: extractGroup(_rxPlato),
      ppg: extractGroup(_rxPPG)
    };

    const freeNumbers = line.match(_rxSoleNumeric);

    // no alpha but definitely a hop, try a lone number that looks appropriate
    if (parsed.time && (parsed.hopForm || parsed.hopAddition) && (parsed.alpha || parsed.ibu) === null && freeNumbers) {
      const alpha = freeNumbers[0];
      if (alpha >= 0 && alpha < 25) {
        parsed.alpha = alpha;
      }
    }

    // no gravity or srm, best take whatever's close to being within range
    if ((parsed.alpha || parsed.time) === null && ((parsed.gravity || parsed.plato || parsed.ppg) === null || (parsed.lovibond || parsed.srm) === null) && freeNumbers) {
      freeNumbers.forEach((n) => {
        if (parsed.ppg === null && n > 25 && n < 44) {
          parsed.ppg = n;
        } else if (parsed.lovibond === null && parsed.srm === null && n > 1 && n < 600) {
          parsed.lovibond = n;
        }
      });
    }

    return parsed;
  } else {
    // is it a recipe parameter?
    const recipeParameter = line.match(_rxRecipeParameter);
    if (recipeParameter) {
      return {
        parameter: recipeParameter[1],
        value: recipeParameter[2]
      };
    }

    // maybe it's yeast?
    let yeast = line.match(_rxYeast);
    if (yeast) {
      yeast = yeast.slice(1);
      const mfg = yeast[0];
      return {
        code: yeast[mfg ? 1 : 2],
        mfg
      };
    }
  }

  return null;
}

function extractNumeric(str) {
  if (str) {
    return ((m) => m && parseFloat(m[0]))(str.match(/\d+(?:[.\d]{2,})?/));
  }

  return null;
}

function parseQuantity(qty) {
  if (qty) {
    let quantity = { value: extractNumeric(qty) };
    const unit = ((u) => _unitMapping[u] || u)(qty.replace(/[\W\d]+/i, '').toLowerCase().trim());
    if (unit) {
      quantity.unit = unit;
    }
    return quantity;
  }

  return null;
}

function buildRecipe(parsed) {
  const recipe = {
    grains: [],
    hops: [],
    yeast: [],
    parameters: []
  };

  parsed.filter(p => p !== null).forEach(p => {
    if (p.quantity) {
      const mapHopDetail = (d) => d && _hopAdditionMapping[d.toLowerCase()];
      let weight = parseQuantity(p.quantity);

      if (p.alpha || p.time || p.hopAddition || p.hopForm) {
        recipe.hops.push({
          name: p.name.replace(/pellet/i, '').trim(),
          alpha: extractNumeric(p.alpha || p.percentage),
          ibu: extractNumeric(p.ibu),
          additions: [{
            minutes: extractNumeric(p.time),
            form: mapHopDetail(p.hopForm),
            additionType: mapHopDetail(p.hopAddition),
            weight
          }]
        });
        console.log(recipe.hops[recipe.hops.length - 1].additions[0].minutes)
      } else if (p.name && !p.time && p.name.toLowerCase() !== 'total') {
        recipe.grains.push({
          name: p.name,
          lovibond: extractNumeric(p.lovibond),
          gravity: extractNumeric(p.gravity),
          plato: extractNumeric(p.plato),
          ppg: extractNumeric(p.ppg),
          srm: extractNumeric(p.srm),
          weight
        });
      }
    } else if (p.code) {
      recipe.yeast.push(p);
    } else if (p.parameter) {
      recipe.parameters.push({
        parameter: _parameterMapping[p.parameter.toLowerCase()] || p.parameter,
        quantity: parseQuantity(p.value)
      });
    }
  });

  return recipe;
}

export default function parseText(recipeText) {
  return buildRecipe(recipeText.split('\n')
                               .filter(l => l.trim().length > 0)
                               .map(l => parseLine(l.trim())));
}
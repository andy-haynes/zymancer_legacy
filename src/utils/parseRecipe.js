import SRMColors from '../constants/SRMColors';
import Units from '../constants/Units';
import helpers from './helpers';
import zymath from './zymath';
import { ExtractGravity, HopAdditionType, HopForm, RecipeParameter, ExtractType } from '../constants/AppConstants';
import Defaults from '../constants/Defaults';
import BJCPStyles from '../constants/BJCPStyles';
import round from 'lodash/round';
import sumBy from 'lodash/sumBy';
import pick from 'lodash/pick';

//const _rxGrain = 'maris|otter|pale|halcyon|golden|promise|winter|barley|spring|colour|lager|mild|vienna|munich|wheat|caramalt|crystal|dark|amber|brown|chocolate|black|roasted|organic|brewers|bonlander|carapils|caramel|maltoferm|extract|apple|wood|smoked|cherry|mesquite|vienne|caracrystal|maltchocolate|malted|flour|pilsen|full|pint|goldpils|ashburne|victory|special|roast|carabrown|extra|light|bavarian|sparkling|porter|traditional|aromatic|flakes|yellow|corn|rice|torrified|hulls|white|blackprinz|midnight|clarified|syrup|briessweet|grain|sorghum|high|maltose';
//const _rxHop = 'admiral|ahtanum|amarillo|aramis|aurora|bitter|gold|blanc|boadicea|bobek|bramling|cross|bravo|brewers|bullion|cascade|celeia|centennial|challenger|chelan|chinook|citra|cluster|columbia|columbus|comet|crystal|czech|saaz|rudi|east|kent|golding|falconer|flight|ella|first|fuggle|galaxy|galena|glacier|green|bullet|hallertau|mittlefruh|helga|herkules|hersbrucker|horizon|huell|melon|kohatu|liberty|loral|magnum|mandarina|bavaria|merkur|millennium|mosaic|motueka|hood|rainier|nelson|sauvin|newport|northdown|northern|brewer|nugget|olympic|opal|pacific|jade|pacifica|palisade|perle|pilgrim|pilot|pioneer|polaris|premiant|pride|ringwood|progress|rakau|riwaka|santiam|saphir|select|simcoe|smaragd|sorachi|southern|sovereign|spalt|sterling|strisselspalt|summer|summit|super|sussex|sylva|tahoma|target|tettnang|tomahawk|triplepearl|triskel|ultra|vanguard|waimea|wakatu|tradition|warrior|whitbread|willamette|yakima|zeus|zythos';
//const _rxYeast = 'cider|er1a|malolactic|blend|ey2d|fruity|white|italian|sparkling|summation|fortified|sweet|bold|high|alcohol|brettanomyces|claussenii|bruxellensis|lactobacillus|brevis|pediococcus|lambicus|german|british|cask|london|american|wyeast|bohemian|whitbread|belgian|saison|ringwood|irish|wheat|burton|abbey|style|thames|valley|west|coast|northwest|strong|yorkshire|scottish|stout|denny|favorite|english|special|bitter|pilsen|lager|pilsner|urquell|strain|budvar|gambrinus|bavarian|rocky|mountain|danish|munich|california|european|north|kolsch|czech|pils|lsch|staro|prague|weihenstephan|octoberfest|hella|bock|brett|forbidden|fruit|berliner|weisse|bruin|leuven|pale|canadian|ardennes|lambic|schelde|french|roeselare|farmhouse|flanders|golden|trappist|gravity|witbier|garde|dark|mead|extreme|fermentation|sake|bedford|essex|east|midlands|antwerp|helles|australian|southwold|premium|edinburgh|klassic|dusseldorf|square|manchester|pacific|sonoma|cream|diego|super|burlington|bastogne|champagne|budejovice|francisco|oktoberfest|rzen|southern|copenhagen|havoc|mexican|hefeweizen|weizen|monastery|saccharomyces|trois|vrai|sour|damnosus|flemish|delbrueckii|bacteria|kombucha|scoby|flor|sherry|pinot|noir|avize|wine|steinberg|geisenheim|chardonnay|merlot|assmanshausen|cabernet|suremain|burgundy|lallemand|ec1118|dried|wldec1118|scotch|whisky|tennessee|whiskey|bourbon|neutral|grain|distillers|wld71b|danstil|edv46|wldedv46|wldk1|superstart|distill|wldss20kg|wldss500gr|ty48|wldty48|vodka|turbo|wldvodkaag|wldwhiskeyag|edv493|wledv493|house|barbarian|flagship|darkness|independence|joystick|citrus|tartan|stefon|kaiser|dieter|whiteout|gnome|triple|double|workhorse|rustic|monastic|napoleon|cablecar|global|harvest|urkel|batch|kidz|suburban';

const _weightOptions = 'lbs|lb|pound|pounds|ounce|ounces|oz|kg|gram|g';
const _volumeOptions = 'tsp|tbsp|liter|l\\s|l$|quart|qt|gallons|gallon|gal|us gallons|us gallon|us gal';
const _unitMarker = '___unit___';

const _decimalTemplate = '\\d+\\.?\\d*';
const _charTemplate = 'a-z®äöüß\\-\'"/°.';
const _alphaNumericTemplate = `0-9${_charTemplate}`;
const _namedQtyTemplate = `((?:${_decimalTemplate})[\\s|]*(?:${_unitMarker})[.]?\\s*(?:(?:${_decimalTemplate})\\s*(?:${_unitMarker}))?)[.]?(?: \\((?:${_decimalTemplate})[\\s|]*(?:${_unitMarker})[.]?\\))?[\\s|\\-]{1,5}([ ${_alphaNumericTemplate}]+[${_alphaNumericTemplate}])`;

function _createMeasurementRegex(template) {
  return new RegExp(_namedQtyTemplate.replace(new RegExp(_unitMarker, 'g'), template), 'i');
}
const _rxNamedWeight = _createMeasurementRegex(_weightOptions);
const _rxNamedVolume = _createMeasurementRegex(_volumeOptions);

const _rxTime = /((?:[0-9]+[.]?[0-9]*)\s*(?:minutes|minute|min|hours|hour|hr)|(?:@|at :)\d+\.?\d*)/i;
const _rxAlpha = /([0-9]+[.]?[0-9]*)\s*[%]?\s*(?:aa|aau|alpha|a.a.)/i;
const _rxIBU = /([0-9]+[.]?[0-9]*)\s*[%]?\s*(?:IBU)/i;
const _rxPercent = /([0-9]+[.]?[0-9]*)(?:\s*%)/i;
const _rxGrainColor = /(\d+\.?\d*)°?\s*(?:Lovibond|lovibond|Lov|lov|L|SRM|srm)°?/;
const _rxExtractForm = /(liquid malt extract|liquid extract|lme|dry malt extract|dry extract|dme)/i;
const _rxHopForm = /(pellets|pellet|whole leaf|whole|leaf)/i;
const _rxHopAddition = /(dry hop|dry-hop|dry|hopback|hop-back|whirlpool|whirl-pool|whirl pool|hopstand|hop-stand|hop stand)/i;
const _rxGravity = /(1\.[0-9]{3})/i;
const _rxPlato = /([0-9]+[.]?[0-9]*)°\s*(?:Plato|P)/i;
const _rxPPG = /([0-9]+[.]?[0-9]*)\s*(?:PPG)/i;
const _rxYeastMfg = /(?:(white labs|wyeast|wyeast labs|safale|imperial|imperial yeast)[\s#:\-]*((?:wlp|[a-z]|us-)?\d{2,6}(?:-pc)?)|((?:wlp|us-)\d{2,6}(?:-pc)?))/i;
const _rxAddition = /(whirlfloc|yeast nutrient|nutrient|calcium chloride|canning salt|iodized salt|salt|gypsum|irish moss|isinglass)/i;
const _rxSoleNumeric = /\s+([0-9]+[.]?[0-9]*)\s+(?!SG|%|SRM|IBU|lbs|lb|pound|pounds|ounce|ounces|oz|kg|tsp|tbsp|liter|l|gallon|gal|quart|g|qt|minutes|minute|min|hours|hour|hr|aa|aau|alpha|a.a.|Lovibond|Lov|L)/ig;
const _rxRecipeParameter = /(boil time|boiling time|batch size|yield|for|boil size|original gravity|final gravity|terminal gravity|og|fg|attenuation|srm|color|ibu|ibus|bitterness|plato|efficiency|abv|alcohol by volume|alcohol by vol)[\sa-z()=:]+((?:[0-9]+[.]?[0-9]*)[°]?\s*(?:%|minutes|minute|min|sg|ibu|srm|gallons|gallon|gal|us gallons|us gallon|us gal)?)/i;

const _unitMapping = {
  'lbs': Units.Pound,
  'lb': Units.Pound,
  'pound': Units.Pound,
  'pounds': Units.Pound,
  'ounce': Units.Ounce,
  'ounces': Units.Ounce,
  'oz': Units.Ounce,
  'kg': Units.Kilogram,
  'tsp': Units.Teaspoon,
  'tbsp': Units.Tablespoon,
  'liter': Units.Liter,
  'l': Units.Liter,
  'gallons': Units.Gallon,
  'gallon': Units.Gallon,
  'us gallons': Units.Gallon,
  'us gallon': Units.Gallon,
  'us gal': Units.Gallon,
  'gal': Units.Gallon,
  'quart': Units.Quart,
  'qt': Units.Quart,
  'gram': Units.Gram,
  'g': Units.Gram,
  'minutes': Units.Minute,
  'minute': Units.Minute,
  'min': Units.Minute,
  'hours': Units.Hour,
  'hour': Units.Hour,
  'hr': Units.Hour
};

const _recipeMapping = {
  'pellets': HopForm.Pellet,
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
  'hop stand': HopAdditionType.Whirlpool,
  'liquid malt extract': ExtractType.Liquid,
  'liquid extract': ExtractType.Liquid,
  'lme': ExtractType.Liquid,
  'dry malt extract': ExtractType.Dry,
  'dry extract': ExtractType.Dry,
  'dme': ExtractType.Dry
};

const _parameterMapping = {
  'boil time': RecipeParameter.BoilTime,
  'boiling time': RecipeParameter.BoilTime,
  'batch size': RecipeParameter.TargetVolume,
  'yield': RecipeParameter.TargetVolume,
  'for': RecipeParameter.TargetVolume,
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
  let isWeight = true;
  let match = _rxNamedWeight.exec(line);
  if (!match) {
    isWeight = false;
    match = _rxNamedVolume.exec(line);
  }

  if (match) {
    const extractGroup = (regex) => ((m) => m && m[1].trim())(regex.exec(line));

    const parsed = {
      [isWeight ? 'weight' : 'volume']: match[1],
      name: match[2].trim(),
      alpha: extractGroup(_rxAlpha),
      ibu: extractGroup(_rxIBU),
      hopForm: extractGroup(_rxHopForm),
      hopAddition: extractGroup(_rxHopAddition),
      time: extractGroup(_rxTime),
      percentage: extractGroup(_rxPercent),
      grainColor: extractGroup(_rxGrainColor),
      gravity: extractGroup(_rxGravity),
      plato: extractGroup(_rxPlato),
      ppg: extractGroup(_rxPPG),
      extract: extractGroup(_rxExtractForm),
      addition: extractGroup(_rxAddition),
      line
    };

    const freeNumbers = line.match(_rxSoleNumeric);

    if (!parsed.addition) {
      // no alpha but definitely a hop, try a lone number that looks appropriate
      if (parsed.time && (parsed.hopForm || parsed.hopAddition) && (parsed.alpha || parsed.ibu) === null && freeNumbers) {
        const alpha = freeNumbers[0];
        if (alpha >= 0 && alpha < 25) {
          parsed.alpha = alpha;
        }
      } else if ((parsed.alpha || parsed.time) === null && ((parsed.gravity || parsed.plato || parsed.ppg) === null || parsed.grainColor === null) && freeNumbers) {
        // no gravity or srm, best take whatever's close to being within range
        freeNumbers.forEach((n) => {
          if (parsed.ppg === null && n > 25 && n < 44) {
            parsed.ppg = n;
          } else if (parsed.grainColor === null && n >= 1.5 && n < 600) {
            parsed.grainColor = n;
          }
        });
      }
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
    let yeast = line.match(_rxYeastMfg);
    if (yeast) {
      yeast = yeast.slice(1);
      const mfg = yeast[0];
      return {
        code: yeast[mfg ? 1 : 2].toString(),
        mfg
      };
    }

    // check against style
    const style = BJCPStyles.map(s => ({ name: s.name.toLowerCase(), id: s.id }))
                            .filter(s => line.toLowerCase().includes(s.name))
                            .map(s => s.id)[0];

    if (style) {
      return { style };
    }
  }

  return null;
}

const _rxNumeric = /\d+\.?\d*/g;
function extractNumeric(str) {
  if (str) {
    return ((m) => m && parseFloat(m[0]))(str.match(_rxNumeric));
  }

  return null;
}

function parseQuantity(qty) {
  if (qty) {
    const quantities = [];
    let quantity = {};

    // split components to allow for compound units (e.g. 11 lbs, 4 oz)
    qty.split(/\s+/g).forEach(q => {
      const value = extractNumeric(q);
      if (value !== null) {
        if (!quantity.value) {
          quantity.value = value;
        } else {
          quantities.push(quantity);
          quantity = { value };
        }
      }

      // check text regardless of whether it contained a
      // numeric value to handle spaceless values (e.g. 7oz)
      if (q.replace(_rxNumeric, '').trim()) {
        const unit = ((u) => _unitMapping[u] || null)(q.replace(/[\W\d]+/i, '').toLowerCase().trim());
        if (unit !== null) {
          if (!quantity.unit) {
            quantity.unit = unit;
          } else {
            quantities.push(quantity);
            quantity = { unit };
          }
        }
      }
    });

    if (quantity.value && quantity.unit && !quantities.includes(quantity)) {
      quantities.push(quantity);
    }

    if (quantities.length) {
      return helpers.sumMeasurements(2, ...quantities);
    }

    return quantity;
  }

  return null;
}

function buildRecipe(parsed) {
  const recipe = {
    styleId: null,
    grains: [],
    hops: [],
    yeast: [],
    additions: [],
    parameters: []
  };

  function createProp(obj) {
    Object.keys(obj).forEach(k => obj[k] === null || typeof obj[k] === 'undefined' ? delete obj[k] : {});
    return obj;
  }

  parsed.filter(p => p !== null).forEach(p => {
    if (p.weight) {
      let weight = parseQuantity(p.weight);

      if (p.addition) {
        recipe.additions.push(createProp({
          name: p.name,
          time: extractNumeric(p.time),
          weight,
          line: p.line
        }));
      } else if (p.alpha || p.time || p.hopAddition || p.hopForm) {
        const mapHopDetail = (d) => d && _recipeMapping[d.toLowerCase()];

        recipe.hops.push(createProp({
          name: p.name.replace(_rxHopForm, '').replace(/(hops|hop|at)(\s|:|$)+/ig, '').trim(),
          alpha: extractNumeric(p.alpha || p.percentage),
          ibu: extractNumeric(p.ibu),
          form: mapHopDetail(p.hopForm),
          line: p.line,
          additions: [{
            minutes: extractNumeric(p.time),
            type: mapHopDetail(p.hopAddition) || HopAdditionType.Boil,
            weight
          }]
        }));
      } else if (p.name && !p.time && p.name.toLowerCase() !== 'total') {
        p.gravity = extractNumeric(p.gravity);
        if (!p.gravity) {
          if (extractNumeric(p.ppg)) {
            p.gravity = zymath.pointsToGravity(extractNumeric(p.ppg));
          } else if (extractNumeric(p.plato)) {
            p.gravity = zymath.platoToGravity(extractNumeric(p.plato));
          }
        }

        let lovibond = extractNumeric(p.grainColor);
        if (lovibond !== null && lovibond >= 1.5) {
          p.lovibond = lovibond;
        }

        const isExtract = p.extract !== null;
        recipe.grains.push(createProp({
          name: p.name,
          gravity: p.gravity,
          lovibond: p.lovibond,
          extractType: isExtract ? _recipeMapping[p.extract] : null,
          isExtract,
          weight,
          line: p.line
        }));
      }
    } else if (p.code) {
      recipe.yeast.push(p);
    } else if (p.parameter) {
      const parameter = _parameterMapping[p.parameter.toLowerCase()] || p.parameter;
      if (!recipe.parameters.some(p => p.parameter === parameter)) {
        recipe.parameters.push(createProp({
          parameter,
          quantity: parseQuantity(p.value),
          value: extractNumeric(p.value),
          line: p.line
        }));
      }
    } else if (p.style) {
      recipe.styleId = p.style;
    }
  });

  return recipe;
}

export default function parseText(recipeText) {
  return buildRecipe(recipeText.split('\n')
                               .filter(l => l.trim().length > 0)
                               .map(l => parseLine(l.trim())));
}
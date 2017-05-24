import PropTypes from 'prop-types';
import Units from '../constants/Units';

// default types
const ArrayRequired = PropTypes.array.isRequired;
const BoolRequired = PropTypes.bool.isRequired;
const NumberOptional = PropTypes.number;
const NumberRequired = PropTypes.number.isRequired;
const ObjectOptional = PropTypes.object;
const ObjectRequired = PropTypes.object.isRequired;
const StringOptional = PropTypes.string;
const StringRequired = PropTypes.string.isRequired;
const NumberOrStringRequired = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]).isRequired;

// custom validators
const units = Object.keys(Units);
function validateUnit(props, propName, componentName) {
  if (propName !== 'value' && !units.includes(props[propName])) {
    return new Error(`Validation failed: Unknown unit '${props[propName]}'.`)
  }
}

// custom common types
const measurement = PropTypes.shape({
  value: NumberOrStringRequired,
  unit: validateUnit
});

const measurementOption = PropTypes.shape({
  value: StringRequired,
  order: NumberRequired,
  name: StringRequired
});

const range = PropTypes.shape({
  min: NumberRequired,
  max: NumberRequired,
  avg: NumberRequired
});

const ratio = PropTypes.shape({
  value: NumberOrStringRequired,
  antecedent: validateUnit,
  consequent: validateUnit
});

const MeasurementRequired = measurement.isRequired;
const RangeRequired = range.isRequired;
const RatioRequired = ratio.isRequired;

const grain = PropTypes.shape({
  id: NumberRequired,
  name: StringRequired,
  url: StringRequired,
  mfg: StringRequired,
  description: StringRequired,
  DBCG: NumberOptional,
  DBFG: NumberOptional,
  isExtract: BoolRequired,
  category: StringOptional,
  flavor: StringOptional,
  weight: MeasurementRequired,
  gravity: NumberRequired,
  lintner: NumberRequired,
  matchScore: NumberOptional,
  lovibond: NumberRequired,
  extractType: StringOptional
});

const hopAddition = PropTypes.shape({
  id: NumberRequired,
  minutes: NumberRequired,
  type: StringRequired,
  weight: MeasurementRequired,
  defaultAddition: BoolRequired
});

const hop = PropTypes.shape({
  id: NumberRequired,
  name: StringRequired,
  url: StringRequired,
  coHumulone: StringOptional,
  myrcene: StringOptional,
  caryophyllene: StringOptional,
  farnesene: StringOptional,
  humulene: StringOptional,
  geraniol: StringOptional,
  alpha: NumberRequired,
  beta: NumberRequired,
  form: StringRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  matchScore: NumberRequired,
  additions: PropTypes.arrayOf(hopAddition).isRequired
});

const ingredientDetail = PropTypes.shape({
  name: StringRequired,
  url: StringRequired,
  description: StringOptional,
  flavor: StringOptional
});

const mashSchedule = PropTypes.shape({
  style: StringRequired,
  thickness: RatioRequired,
  boilOff: RatioRequired,
  absorption: RatioRequired,
  boilLoss: MeasurementRequired,
  absorptionLoss: MeasurementRequired,
  totalLoss: MeasurementRequired,
  grainTemp: MeasurementRequired,
  infusionTemp: MeasurementRequired,
  mashoutTemp: MeasurementRequired,
  strikeTemp: MeasurementRequired,
  spargeTemp: MeasurementRequired,
  infusionVolume: MeasurementRequired,
  strikeVolume: MeasurementRequired,
  spargeVolume: MeasurementRequired,
  rests: ArrayRequired,
  decoctions: ArrayRequired
});

const search = PropTypes.shape({
  query: StringRequired,
  results: ArrayRequired,
  loading: BoolRequired,
  error: ObjectOptional
});

const style = PropTypes.shape({
  name: StringOptional,
  code: StringOptional,
  ogLow: NumberOptional,
  ogHigh: NumberOptional,
  fgLow: NumberOptional,
  fgHigh: NumberOptional,
  ibuLow: NumberOptional,
  ibuHigh: NumberOptional,
  srmLow: NumberOptional,
  srmHigh: NumberOptional,
  description: StringOptional,
  overallImpression: StringOptional,
  aroma: StringOptional,
  mouthfeel: StringOptional,
  comments: StringOptional,
  history: StringOptional,
  characteristics: StringOptional,
  styleComparisons: StringOptional,
  commercialExamples: StringOptional,
  inOGRange: BoolRequired,
  inFGRange: BoolRequired,
  inABVRange: BoolRequired,
  inIBURange: BoolRequired,
  inSRMRange: BoolRequired
});

const yeast = PropTypes.shape({
  id: NumberRequired,
  name: StringRequired,
  code: StringRequired,
  url: StringRequired,
  mfg: StringRequired,
  description: StringRequired,
  flocculation: StringOptional,
  toleranceLow: NumberOptional,
  toleranceHigh: NumberOptional,
  attenuationLow: NumberOptional,
  attenuationHigh: NumberOptional,
  temperatureLow: NumberOptional,
  temperatureHigh: NumberOptional,
  mfgDate: ObjectRequired,
  quantity: NumberRequired,
  viability: NumberRequired,
  styles: StringRequired,
  matchScore: NumberOptional,
  apparentAttenuation: NumberRequired,
  starterSteps: ArrayRequired
});

const recipe = PropTypes.shape({
  id: NumberOptional,
  name: StringRequired,
  originalGravity: NumberRequired,
  finalGravity: NumberRequired,
  IBU: NumberRequired,
  ABV: NumberRequired,
  style: PropTypes.shape({
    code: StringOptional,
    name: StringOptional
  })
});

const savedRecipes = PropTypes.arrayOf(
  PropTypes.shape({
    isFetching: BoolRequired,
    recipes: PropTypes.arrayOf(recipe).isRequired
  })
);

export default {
  grain,
  hop,
  hopAddition,
  ingredientDetail,
  mashSchedule,
  measurement,
  measurementOption,
  ratio,
  recipe,
  savedRecipes,
  search,
  style,
  yeast
}
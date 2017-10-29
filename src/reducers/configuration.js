import RecipeActions from '../constants/RecipeActionTypes';
import Units from '../constants/Units';
import { BrewMethod, HopForm, HopAdditionType, MashMethod } from '../constants/AppConstants';
import measurement from '../reducers/measurement';
import ratio from '../reducers/ratio';
import helpers from '../utils/helpers';

export const DefaultConfiguration = {
  defaults: {
    recipe: {
      name: 'My Beer Recipe',
      style: { id: 59 },
      boilMinutes: 60,
      brewMethod: BrewMethod.AllGrain,
      targetVolume: { value: 5, unit: Units.Gallon },
    },
    fermentables: {
      gravity: 1.030,
      lovibond: 5,
      lintner: 0,
      weight: { value: 1, unit: Units.Pound }
    },
    hops: {
      alpha: 6,
      beta: 4,
      form: HopForm.Pellet,
      weight: { value: 1, unit: Units.Ounce },
      minutes: 60,
      additionType: HopAdditionType.Boil
    },
    mash: {
      style: MashMethod.SingleInfusion,
      grainTemp: { value: 68, unit: Units.Fahrenheit },
      boilMinutes: 60,
      mashThickness: { value: 1.25, antecedent: Units.Quart, consequent: Units.Pound, min: 0.5, max: 3 },
      strikeTemp: { value: 161, unit: Units.Fahrenheit },
      infusionTemp: { value: 152, unit: Units.Fahrenheit, min: 110, max: 190 },
      mashoutTemp: { value: 170, unit: Units.Fahrenheit, min: 150, max: 212 },
      grainAbsorption: { value: 0.1, antecedent: Units.Gallon, consequent: Units.Pound, min: 0.05, max: 0.3 },
      boilOffRate: { value: 1, antecedent: Units.Gallon, consequent: Units.Hour, min: 0.1, max: 5 },
      efficiency: 75,
      maxEfficiencyPercentage: 100,
      minEfficiencyPercentage: 25
    },
    fermentation: {
      pitchRate: 0.75,
      daysSinceManufacture: 21,
      pitchQuantity: 1,
      attenuation: 0.75,
      maxAttenuation: 0.80,
      minAttenuation: 0.70,
      maxViability: 97,
      minViability: 10,
      temperature: { value: 68, unit: Units.Fahrenheit },
      tolerance: 8
    }
  },
  constants: { },
  formulas: { }
};

const NonNumericDefaults = {
  recipe: ['name', 'brewMethod'],
  fermentables: [],
  hops: ['form', 'additionType'],
  mash: ['style'],
  fermentation: []
};

const configuration = (state = DefaultConfiguration, action) => {
  switch (action.type) {
    case RecipeActions.ConfigureDefault:
      // TODO: replace with class type check
      const isMeasurement = action.value.unit !== undefined;
      const isRatio = action.value.antecedent !== undefined;

      let { section, key, value } = action;

      const currentValue = state.defaults[section][key];
      if (isRatio) {
        value = ratio(currentValue, { ratio: value });
      } else if (isMeasurement) {
        // TODO: specify precision for recipe parameters
        value = measurement(currentValue, { measurement: action.value, precision: 2 });
      } else if (section === 'recipe' && key === 'style') {
        value = { id: value };
      } else if (!NonNumericDefaults[section].includes(key)) {
        value = ((n) => n === null ? currentValue : n)(helpers.numberOrNull(value));
      }

      return Object.assign({}, state, {
        defaults: Object.assign({}, state.defaults, {
          [action.section]: Object.assign({}, state.defaults[action.section], {
            [action.key]: value
          })
        })
      });
    default:
      return state;
  }
};

export default configuration;

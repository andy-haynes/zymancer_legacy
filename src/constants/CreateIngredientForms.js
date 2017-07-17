import { IngredientType } from './AppConstants';

export default {
  [IngredientType.Grain]: [{
    key: 'name',
    label: 'Grain Name',
    width: '1-1',
    default: ''
  }, {
    key: 'gravity',
    label: 'Specific Gravity',
    width: '1-2',
    default: '1.035'
  }, {
    key: 'lovibond',
    label: '˚Lovibond ',
    width: '1-2',
    default: '5'
  }],
  [IngredientType.Hop]: [{
    key: 'name',
    label: 'Hop Name',
    width: '4-5',
    default: ''
  }, {
    key: 'alpha',
    label: 'Alpha Acid Units',
    width: '1-5',
    default: '8',
    suffix: '%'
  }],
  [IngredientType.Yeast]: [{
    key: 'name',
    label: 'Yeast Name',
    width: '1-1',
    default: ''
  }, {
    key: 'apparentAttenuation',
    label: 'Attenuation',
    width: '1-8',
    default: '78',
    suffix: '%'
  }]
};
import { Gallon, Pound, Ounce, Fahrenheit } from './Units';
import { DefaultTargetVolume, DefaultBoilVolume, DefaultBoilMinutes, DefaultEfficiencyPercentage, DefaultMashThickness } from './Defaults';
import hopSearch from '../reducers/hopSearch';
import mashSchedule from '../reducers/mashSchedule';
import fermentation from '../reducers/fermentation';
import yeastSearch from '../reducers/yeastSearch';
import grainSearch from '../reducers/grainSearch';

const initialState = {
  recipeName: 'My Awesome Mixed Beer #6',
  originalGravity: 1.0,
  finalGravity: 1.0,
  IBU: 0,
  ABV: 0,
  targetVolume: DefaultTargetVolume,
  boilVolume: DefaultBoilVolume,
  boilMinutes: DefaultBoilMinutes,
  efficiency: DefaultEfficiencyPercentage,
  grains: [],
  grainSearch: grainSearch(undefined, {}),
  hops: [],
  hopSearch: hopSearch(undefined, {}),
  mashSchedule: mashSchedule(undefined, {}),
  fermentation: fermentation(undefined, {}),
  yeastSearch: yeastSearch(undefined, {})
};

//const recipe = Object.assign({}, initialState, {
const recipe = {
  recipeName: 'bisghetti',
  targetVolume: DefaultTargetVolume,
  boilVolume: DefaultBoilVolume,
  boilMinutes: DefaultBoilMinutes,
  efficiency: DefaultEfficiencyPercentage,
  mashSchedule: Object.assign({}, mashSchedule(undefined, {}), {
    minutes: 60,
    infusionTemp: { value: 152, unit: Fahrenheit }
  }),
  grains: [
    { id: 1, name: '2-Row Brewers Malt Briess', gravity: 1.037, lovibond: 1, weight: { value: 14, unit: Pound } },
    { id: 2, name: 'Invert Sugar', gravity: 1.050, lovibond: 0, weight: { value: 1.5, unit: Pound } },
    { id: 3, name: 'Flaked Barley', gravity: 1.011, lovibond: 1, weight: { value: 1, unit: Pound } },
    { id: 4, name: 'Black Malt', gravity: 1.028, lovibond: 550, weight: { value: 0.75, unit: Pound } }
  ],
  hops: [
    { id: 1, name: 'Columbus', alpha: 15.4, categories: ["Earthy","Citrus","Spicy"], additions: [
      { id: 1, minutes: 60, weight: { value: 1, unit: Ounce } }
    ]
    },
    { id: 2, name: 'Cascade', alpha: 6.6, categories: ["Floral","Citrus","Spicy"], additions: [
      { id: 2, minutes: 30, weight: { value: 1.5, unit: Ounce } },
      { id: 3, minutes: 20, weight: { value: 1.5, unit: Ounce } },
      { id: 4, minutes: 10, weight: { value: 1, unit: Ounce } }
    ]}
  ]
};

export default recipe;

import { Gallon, Pound, Ounce, Fahrenheit } from './Units';
import { DefaultTargetVolume, DefaultBoilVolume, DefaultBoilMinutes, DefaultEfficiencyPercentage, DefaultMashThickness } from './Defaults';
import mashSchedule from '../reducers/mashSchedule';

//https://www.brewtoad.com/recipes/berts-imperial-stout
const recipe = {
  id: 1,
  name: "Bert's Imperial Stout",
  style: "Imperial Stout",
  targetVolume: { value: 5.5, unit: Gallon },
  originalGravity: 1.065,
  finalGravity: 1.012,
  ABV: 6,
  IBU: 32.3,
  boilMinutes: DefaultBoilMinutes,
  efficiency: DefaultEfficiencyPercentage,
  mashSchedule: Object.assign({}, mashSchedule(undefined, {}), {
    minutes: 60,
    infusionTemp: { value: 152, unit: Fahrenheit }
  }),
  grains: [
    { id: 1, name: '2-Row Brewers Malt Briess', gravity: 1.037, lovibond: 1, weight: { value: 14, unit: Pound } },
    { id: 2, name: 'Invert Sugar', gravity: 1.046, lovibond: 0, weight: { value: 1.5, unit: Pound } },
    { id: 3, name: 'Flaked Barley', gravity: 1.032, lovibond: 1, weight: { value: 1, unit: Pound } },
    { id: 4, name: 'Flaked Wheat', gravity: 1.034, lovibond: 2, weight: { value: 1, unit: Pound } },
    { id: 5, name: 'Black Malt', gravity: 1.030, lovibond: 550, weight: { value: 0.75, unit: Pound } },
    { id: 6, name: 'Chocolate Malt', gravity: 1.032, lovibond: 475, weight: { value: 0.25, unit: Pound } }
  ],
  hops: [
    { id: 1, name: 'Columbus', alpha: 15.4, beta: 5.1, categories: ["Earthy","Citrus","Spicy"], additions: [
      { id: 1, minutes: 60, weight: { value: 1, unit: Ounce } }
    ]
    },
    { id: 2, name: 'Cascade', alpha: 6.6, beta: 4.3, categories: ["Floral","Citrus","Spicy"], additions: [
      { id: 2, minutes: 30, weight: { value: 1.5, unit: Ounce } },
      { id: 3, minutes: 20, weight: { value: 1.5, unit: Ounce } },
      { id: 4, minutes: 10, weight: { value: 1, unit: Ounce } }
    ]}
  ]
};

export default recipe;

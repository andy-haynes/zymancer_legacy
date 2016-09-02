import {
  SetMashThickness,
  SetBoilOff,
  SetGrainAbsorption,
  SetInfusionTemp,
  SetGrainTemp,
  SetMashoutTemp
} from '../constants/RecipeActionTypes';
import {
  DefaultMashThickness,
  DefaultBoilOffRate,
  DefaultGrainAbsorptionLoss,
  DefaultGrainTemp,
  DefaultInfusionTemp,
  DefaultMashoutTemp
} from '../constants/Defaults';
import { convertRatio, calculateBoilVolume, calculateStrikeWaterTemp } from '../utils/BrewMath';
import measurement from './measurement';
import { Quart, Fahrenheit } from '../constants/Units';

const emptyVolume = { value: 0, unit: Quart };
const initialState = {
  thickness: DefaultMashThickness,
  boilOff: DefaultBoilOffRate,
  absorption: DefaultGrainAbsorptionLoss,
  grainTemp: DefaultGrainTemp,
  infusionTemp: DefaultInfusionTemp,
  mashoutTemp: DefaultMashoutTemp,
  strikeTemp: calculateStrikeWaterTemp(DefaultMashThickness, DefaultGrainTemp, DefaultInfusionTemp),
  spargeTemp: { value: 0, unit: Fahrenheit },
  strikeVolume: emptyVolume,
  spargeVolume: emptyVolume
};

const convertRatioDelta = (ratio, delta) => {
  return convertRatio(ratio, Object.assign({}, ratio, delta), 2);
};

const mashSchedule = (state = initialState, action) => {
  switch (action.type) {
    case SetMashThickness:
      return Object.assign({}, state, {
        thickness: convertRatioDelta(state.thickness, action.thickness)
      });
    case SetBoilOff:
      return Object.assign({}, state, {
        boilOff: convertRatioDelta(state.boilOff, action.boilOff)
      });
    case SetGrainAbsorption:
      return Object.assign({}, state, {
        absorption: convertRatioDelta(state.absorption, action.absorption)
      });
    case SetInfusionTemp:
      return Object.assign({}, state, {
        infusionTemp: measurement(state.infusionTemp, action)
      });
    case SetMashoutTemp:
      return Object.assign({}, state, {
        mashoutTemp: measurement(state.mashoutTemp, action)
      });
    case SetGrainTemp:
      return Object.assign({}, state, {
        grainTemp: measurement(state.grainTemp, action)
      });
    default:
      return state;
  }
};

export default mashSchedule;
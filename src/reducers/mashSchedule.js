import RecipeActions from '../constants/RecipeActionTypes';
import zymath from '../utils/zymath';
import helpers from '../utils/helpers';
import Defaults from '../constants/Defaults';
import { MashMethod } from '../constants/AppConstants';
import measurement from './measurement';
import ratio from './ratio';
import Units from '../constants/Units';

function createMashSchedule(mash = {}) {
  const emptyVolume = { value: 0, unit: Units.Quart };
  return {
    style: mash.style || MashMethod.SingleInfusion,
    thickness: mash.thickness || Defaults.MashThickness,
    boilOff: mash.boilOff || Defaults.BoilOffRate,
    absorption: mash.absorption || Defaults.GrainAbsorptionLoss,
    boilLoss: mash.boilLoss || emptyVolume,
    absorptionLoss: mash.absorptionLoss || emptyVolume,
    totalLoss: mash.totalLoss || emptyVolume,
    grainTemp: mash.grainTemp || Defaults.GrainTemp,
    infusionTemp: mash.infusionTemp || Defaults.InfusionTemp,
    mashoutTemp: mash.mashoutTemp || Defaults.MashoutTemp,
    strikeTemp: mash.strikeTemp || { value: 0, unit: Units.Fahrenheit },
    //spargeTemp: mash.spargeTemp || { value: 0, unit: Units.Fahrenheit },
    rests: mash.rests || [],
    decoctions: mash.decoctions || [],
    infusionVolume: mash.infusionVolume || emptyVolume,
    strikeVolume: mash.strikeVolume || emptyVolume,
    spargeVolume: mash.spargeVolume || emptyVolume
  };
}

const mashSchedule = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.SetMashStyle:
      return Object.assign({}, state, {
        style: action.style
      });
    case RecipeActions.SetMashThickness:
      return Object.assign({}, state, {
        thickness: ratio(state.thickness, action)
      });
    case RecipeActions.SetBoilOff:
      return Object.assign({}, state, {
        boilOff: ratio(state.boilOff, action)
      });
    case RecipeActions.SetGrainAbsorption:
      return Object.assign({}, state, {
        absorption: ratio(state.absorption, action)
      });
    case RecipeActions.SetInfusionTemp:
      return Object.assign({}, state, {
        infusionTemp: measurement(state.infusionTemp, action)
      });
    case RecipeActions.SetMashoutTemp:
      return Object.assign({}, state, {
        mashoutTemp: measurement(state.mashoutTemp, action)
      });
    case RecipeActions.SetGrainTemp:
      return Object.assign({}, state, {
        grainTemp: measurement(state.grainTemp, action)
      });
    case RecipeActions.AddRest:
      return Object.assign({}, state, {
        rests: state.rests.push(action.rest)
      });
    case RecipeActions.RemoveRest:
      return Object.assign({}, state, {
        rests: state.rests.filter(r => r.id !== action.rest.id)
      });
    case RecipeActions.SetRestTemperature:
      return Object.assign({}, state, {
        rests: state.rests.map(r => r.id !== action.rest.id ? r : Object.assign({}, r, {
          temperature: action.rest.temperature
        }))
      });
    default:
      return Object.keys(state).length ? state : createMashSchedule();
  }
};

mashSchedule.create = createMashSchedule;

export default mashSchedule;
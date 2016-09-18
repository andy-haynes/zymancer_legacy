import {
  AddYeast,
  SetYeastMfgDate,
  SetYeastAttenuation,
  SetYeastViability,
  SetYeastQuantity,
  AddStarterStep,
  RemoveStarterStep
} from '../constants/RecipeActionTypes';
import { DefaultGrainWeight } from '../constants/Defaults';
import { calculateYeastViability } from '../utils/BrewMath';
import { extractRange } from '../utils/core';
import measurement from './measurement';

const yeast = (state = {}, action) => {
  switch (action.type) {
    case AddYeast:
      const now = new Date();
      const mfgDate = new Date(now.getFullYear(), now.getMonth(), -7);
      const attenuation = extractRange(action.yeast.attenuation);
      const tempF = extractRange(action.yeast.rangeF);
      const tempC = extractRange(action.yeast.rangeC);

      return {
        id: action.yeastId,
        ingredientId: action.yeast.ingredientId,
        name: action.yeast.name,
        code: action.yeast.code,
        mfg: action.yeast.mfg,
        mfgDate,
        url: action.yeast.url,
        description: action.yeast.description,
        quantity: 1,
        attenuation: attenuation.avg,
        attenuationLow: attenuation.low,
        attenuationHigh: attenuation.high,
        tempHighF: tempF.high,
        tempLowF: tempF.low,
        tempHighC: tempC.high,
        tempLowC: tempC.low,
        viability: calculateYeastViability(mfgDate),
        flocculation: action.yeast.flocculation,
        tolerance: parseFloat(action.yeast.tolerance),
        styles: action.yeast.styles.join(', '),
        starterSteps: []
      };
    case SetYeastMfgDate:
      return Object.assign({}, state, {
        mfgDate: action.date,
        viability: calculateYeastViability(action.date)
      });
    case SetYeastViability:
      return Object.assign({}, state, {
        viability: action.viability
      });
    case SetYeastAttenuation:
      return Object.assign({}, state, {
        attenuation: action.attenuation
      });
    case SetYeastQuantity:
      return Object.assign({}, state, {
        quantity: action.quantity
      });
    case AddStarterStep:
    case RemoveStarterStep:
    default:
      return state;
  }
};

export default yeast;
import {
  // grains
  AddGrain,
  RemoveGrain,
  FilterGrainResults,
  ClearGrainSearch,
  SetGrainWeight,
  SetGrainGravity,
  SetGrainLovibond,
  // hops
  AddHop,
  RemoveHop,
  AddHopAddition,
  SetHopAdditionTime,
  SetHopAdditionWeight,
  RemoveHopAddition,
  SetHopAlpha,
  SetHopBeta,
  // mash
  SetMashThickness,
  SetBoilOff,
  SetGrainAbsorption,
  SetInfusionTemp,
  SetMashoutTemp,
  SetGrainTemp,
  // recipe
  SaveRecipe,
  SetRecipeName,
  SetRecipeStyle,
  SetBoilVolume,
  SetTargetVolume,
  SetBoilTime,
  SetEfficiency,
  // Fermentation
  SetPitchRate,
  SetYeastAttenuation,
  SetYeastViability,
  SetYeastQuantity,
  AddStarterStep,
  RemoveStarterStep,
  SetYeastMfgDate,
  AddYeast,
  RemoveYeast
} from '../constants/RecipeActionTypes';

function createAction(type, argNames, setters) {
  return function(...args) {
    let action = { type };

    if (setters) {
      for (let prop in setters) {
        if (setters.hasOwnProperty(prop)) {
          action[prop] = setters[prop]();
        }
      }
    }

    if (argNames) {
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index];
      });
    }

    return action;
  }
}

// identities
let grainId = 0;
let hopId = 0;
let additionId = 0;
let yeastId = 0;

// ***************************** grains ***************************
export const addGrain = createAction(AddGrain, ['grain'], { grainId: () => grainId++ });
export const removeGrain = createAction(RemoveGrain, ['grain']);
export const setGrainWeight = createAction(SetGrainWeight, ['grain', 'measurement']);
export const setGrainGravity = createAction(SetGrainGravity, ['grain', 'gravity']);
export const setGrainLovibond = createAction(SetGrainLovibond, ['grain', 'lovibond']);

// ***************************** hops *****************************
export const addHop = createAction(AddHop, ['hop'], { hopId: () => hopId++, additionId: () => additionId++ });
export const removeHop = createAction(RemoveHop, ['hop']);
export const addAddition = createAction(AddHopAddition, ['hop'], { additionId: () => additionId++ });
export const setAdditionTime = createAction(SetHopAdditionTime, ['addition', 'hop', 'minutes']);
export const setAdditionWeight = createAction(SetHopAdditionWeight, ['addition', 'hop', 'measurement']);
export const removeAddition = createAction(RemoveHopAddition, ['addition', 'hop']);
export const setHopAlpha = createAction(SetHopAlpha, ['hop', 'alpha']);
export const setHopBeta = createAction(SetHopBeta, ['hop', 'beta']);

// ************************* mash schedule ************************
export const setMashThickness = createAction(SetMashThickness, ['thickness']);
export const setBoilOff = createAction(SetBoilOff, ['boilOff']);
export const setGrainAbsorption = createAction(SetGrainAbsorption, ['absorption']);
export const setInfusionTemp = createAction(SetInfusionTemp, ['measurement']);
export const setMashoutTemp = createAction(SetMashoutTemp, ['measurement']);
export const setGrainTemp = createAction(SetGrainTemp, ['measurement']);

// *************************** recipe *****************************
export const setRecipeName = createAction(SetRecipeName, ['name']);
export const setRecipeStyle = createAction(SetRecipeStyle, ['style']);
export const setBoilVolume = createAction(SetBoilVolume, ['measurement']);
export const setTargetVolume = createAction(SetTargetVolume, ['measurement']);
export const setBoilTime = createAction(SetBoilTime, ['minutes']);
export const setEfficiency = createAction(SetEfficiency, ['efficiency']);

// ************************* fermentation *************************
export const addYeast = createAction(AddYeast, ['yeast'], { yeastId: () => yeastId++ });
export const removeYeast = createAction(RemoveYeast, ['yeast']);
export const setPitchRate = createAction(SetPitchRate, ['rate']);
export const setYeastMfgDate = createAction(SetYeastMfgDate, ['yeast', 'date']);
export const setYeastAttenuation = createAction(SetYeastAttenuation, ['yeast', 'attenuation']);
export const setYeastViability = createAction(SetYeastViability, ['yeast', 'viability']);
export const setYeastQuantity = createAction(SetYeastQuantity, ['yeast', 'quantity']);
export const addStarterStep = createAction(AddStarterStep, ['yeast', 'gravity', 'hours']);
export const removeStarterStep = createAction(RemoveStarterStep, ['yeast']);
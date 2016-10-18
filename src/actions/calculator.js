import RecipeActions from '../constants/RecipeActionTypes';

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
export const addGrain = createAction(RecipeActions.AddGrain, ['grain'], { grainId: () => grainId++ });
export const removeGrain = createAction(RecipeActions.RemoveGrain, ['grain']);
export const setGrainWeight = createAction(RecipeActions.SetGrainWeight, ['grain', 'measurement']);
export const setGrainGravity = createAction(RecipeActions.SetGrainGravity, ['grain', 'gravity']);
export const setGrainLovibond = createAction(RecipeActions.SetGrainLovibond, ['grain', 'lovibond']);

// ***************************** hops *****************************
export const addHop = createAction(RecipeActions.AddHop, ['hop'], { hopId: () => hopId++, additionId: () => additionId++ });
export const removeHop = createAction(RecipeActions.RemoveHop, ['hop']);
export const addAddition = createAction(RecipeActions.AddHopAddition, ['hop'], { additionId: () => additionId++ });
export const setAdditionTime = createAction(RecipeActions.SetHopAdditionTime, ['addition', 'hop', 'minutes']);
export const setAdditionWeight = createAction(RecipeActions.SetHopAdditionWeight, ['addition', 'hop', 'measurement']);
export const removeAddition = createAction(RecipeActions.RemoveHopAddition, ['addition', 'hop']);
export const setHopAlpha = createAction(RecipeActions.SetHopAlpha, ['hop', 'alpha']);
export const setHopBeta = createAction(RecipeActions.SetHopBeta, ['hop', 'beta']);

// ************************* mash schedule ************************
export const setMashStyle = createAction(RecipeActions.SetMashStyle, ['style']);
export const setMashThickness = createAction(RecipeActions.SetMashThickness, ['thickness']);
export const setBoilOff = createAction(RecipeActions.SetBoilOff, ['boilOff']);
export const setGrainAbsorption = createAction(RecipeActions.SetGrainAbsorption, ['absorption']);
export const setInfusionTemp = createAction(RecipeActions.SetInfusionTemp, ['measurement']);
export const setMashoutTemp = createAction(RecipeActions.SetMashoutTemp, ['measurement']);
export const setGrainTemp = createAction(RecipeActions.SetGrainTemp, ['measurement']);

// *************************** recipe *****************************
export const setRecipeName = createAction(RecipeActions.SetRecipeName, ['name']);
export const setRecipeStyle = createAction(RecipeActions.SetRecipeStyle, ['style']);
export const setBoilVolume = createAction(RecipeActions.SetBoilVolume, ['measurement']);
export const setTargetVolume = createAction(RecipeActions.SetTargetVolume, ['measurement']);
export const setBoilTime = createAction(RecipeActions.SetBoilTime, ['minutes']);
export const setEfficiency = createAction(RecipeActions.SetEfficiency, ['efficiency']);

// ************************* fermentation *************************
export const addYeast = createAction(RecipeActions.AddYeast, ['yeast'], { yeastId: () => yeastId++ });
export const removeYeast = createAction(RecipeActions.RemoveYeast, ['yeast']);
export const setPitchRate = createAction(RecipeActions.SetPitchRate, ['rate']);
export const setYeastMfgDate = createAction(RecipeActions.SetYeastMfgDate, ['yeast', 'date']);
export const setYeastAttenuation = createAction(RecipeActions.SetYeastAttenuation, ['yeast', 'attenuation']);
export const setYeastViability = createAction(RecipeActions.SetYeastViability, ['yeast', 'viability']);
export const setYeastQuantity = createAction(RecipeActions.SetYeastQuantity, ['yeast', 'quantity']);
export const addStarterStep = createAction(RecipeActions.AddStarterStep, ['yeast', 'gravity', 'hours']);
export const removeStarterStep = createAction(RecipeActions.RemoveStarterStep, ['yeast']);
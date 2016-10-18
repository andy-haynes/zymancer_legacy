import RecipeActions from '../constants/RecipeActionTypes';
import helpers from '../utils/helpers';

/***************************** grains ***************************/
export const addGrain = helpers.createAction(RecipeActions.AddGrain, 'grain');
export const removeGrain = helpers.createAction(RecipeActions.RemoveGrain, 'grain');
export const setGrainWeight = helpers.createAction(RecipeActions.SetGrainWeight, 'grain', 'measurement');
export const setGrainGravity = helpers.createAction(RecipeActions.SetGrainGravity, 'grain', 'gravity');
export const setGrainLovibond = helpers.createAction(RecipeActions.SetGrainLovibond, 'grain', 'lovibond');

/***************************** hops *****************************/
export const addHop = helpers.createAction(RecipeActions.AddHop, 'hop');
export const removeHop = helpers.createAction(RecipeActions.RemoveHop, 'hop');
export const addAddition = helpers.createAction(RecipeActions.AddHopAddition, 'hop');
export const setAdditionTime = helpers.createAction(RecipeActions.SetHopAdditionTime, 'addition', 'hop', 'minutes');
export const setAdditionWeight = helpers.createAction(RecipeActions.SetHopAdditionWeight, 'addition', 'hop', 'measurement');
export const removeAddition = helpers.createAction(RecipeActions.RemoveHopAddition, 'addition', 'hop');
export const setHopAlpha = helpers.createAction(RecipeActions.SetHopAlpha, 'hop', 'alpha');
export const setHopBeta = helpers.createAction(RecipeActions.SetHopBeta, 'hop', 'beta');

/************************* mash schedule ************************/
export const setMashStyle = helpers.createAction(RecipeActions.SetMashStyle, 'style');
export const setMashThickness = helpers.createAction(RecipeActions.SetMashThickness, 'thickness');
export const setBoilOff = helpers.createAction(RecipeActions.SetBoilOff, 'boilOff');
export const setGrainAbsorption = helpers.createAction(RecipeActions.SetGrainAbsorption, 'absorption');
export const setInfusionTemp = helpers.createAction(RecipeActions.SetInfusionTemp, 'measurement');
export const setMashoutTemp = helpers.createAction(RecipeActions.SetMashoutTemp, 'measurement');
export const setGrainTemp = helpers.createAction(RecipeActions.SetGrainTemp, 'measurement');

/*************************** recipe *****************************/
export const setRecipeName = helpers.createAction(RecipeActions.SetRecipeName, 'name');
export const setRecipeStyle = helpers.createAction(RecipeActions.SetRecipeStyle, 'style');
export const setRecipeMethod = helpers.createAction(RecipeActions.SetRecipeMethod, 'method');
export const setBoilVolume = helpers.createAction(RecipeActions.SetBoilVolume, 'measurement');
export const setTargetVolume = helpers.createAction(RecipeActions.SetTargetVolume, 'measurement');
export const setBoilTime = helpers.createAction(RecipeActions.SetBoilTime, 'minutes');
export const setEfficiency = helpers.createAction(RecipeActions.SetEfficiency, 'efficiency');

/************************* fermentation *************************/
export const addYeast = helpers.createAction(RecipeActions.AddYeast, 'yeast');
export const removeYeast = helpers.createAction(RecipeActions.RemoveYeast, 'yeast');
export const setPitchRate = helpers.createAction(RecipeActions.SetPitchRate, 'rate');
export const setYeastMfgDate = helpers.createAction(RecipeActions.SetYeastMfgDate, 'yeast', 'date');
export const setYeastAttenuation = helpers.createAction(RecipeActions.SetYeastAttenuation, 'yeast', 'attenuation');
export const setYeastViability = helpers.createAction(RecipeActions.SetYeastViability, 'yeast', 'viability');
export const setYeastQuantity = helpers.createAction(RecipeActions.SetYeastQuantity, 'yeast', 'quantity');
export const addStarterStep = helpers.createAction(RecipeActions.AddStarterStep, 'yeast', 'gravity', 'hours');
export const removeStarterStep = helpers.createAction(RecipeActions.RemoveStarterStep, 'yeast');
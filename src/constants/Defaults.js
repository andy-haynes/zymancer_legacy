import RecipeActionTypes from './RecipeActionTypes';

// precision
const MeasurementPrecision = {
  [RecipeActionTypes.SetGrainWeight]: 2,
  [RecipeActionTypes.SetBoilVolume]: 1,
  [RecipeActionTypes.SetTargetVolume]: 1,
  [RecipeActionTypes.SetHopAdditionWeight]: 2,
  [RecipeActionTypes.SetGrainAbsorption]: 1,
  [RecipeActionTypes.SetBoilOff]: 1,
  [RecipeActionTypes.SetInfusionTemp]: 1,
  [RecipeActionTypes.SetGrainTemp]: 1
};

// routing
const SelectedRoute = {
  '/': ['', 'recipe'],
  '/recipes': ['recipes'],
  '/parser': ['parser'],
  '/account': ['account'],
  '/configuration': ['configuration'],
  '/login': ['login'],
  '/logout': ['logout'],
  '/contact': ['contact']
};

export default {
  MeasurementPrecision,
  SelectedRoute
};

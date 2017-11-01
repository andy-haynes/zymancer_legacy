import keyMirror from 'fbjs/lib/keyMirror';
import RecipeActionTypes from './RecipeActionTypes';

export const RecipeType = keyMirror({
  SavedRecipes: null,
  SharedRecipes: null,
  PublicRecipes: null
});

export const IngredientType = keyMirror({
  Grain: null,
  Hop: null,
  Yeast: null
});

export const BrewMethod = keyMirror({
  Extract: null,
  AllGrain: null,
  PartialMash: null
});

export const MashMethod = keyMirror({
  SingleInfusion: null,
  BIAB: null
  //MultipleRest: null,
  //Decoction: null
});

export const ExtractType = keyMirror({
  Liquid: null,
  Dry: null
});

export const ExtractGravity = {
  [ExtractType.Liquid]: 1.037,
  [ExtractType.Dry]: 1.044
};

export const HopForm = keyMirror({
  Pellet: null,
  Leaf: null
});

export const HopAdditionType = keyMirror({
  FirstWort: null,
  Boil: null,
  Whirlpool: null,
  HopBack: null,
  Dry: null
});

export const RecipeParameter = keyMirror({
  TargetVolume: null,
  BoilVolume: null,
  BrewMethod: null,
  Efficiency: null,
  BoilTime: null,
  OriginalGravity: null,
  FinalGravity: null,
  Attenuation: null,
  ABV: null,
  IBU: null,
  SRM: null
});

export const MobileRecipeTab = keyMirror({
  Root: null,
  Grains: null,
  Hops: null,
  Mash: null,
  Fermentation: null,
  Style: null
});

export const ConfigSection = keyMirror({
  Recipe: null,
  Fermentables: null,
  Hops: null,
  Mash: null,
  Fermentation: null,
  Formulas: null
});

export const MeasurementPrecision = {
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
export const SelectedRoute = {
  '/': ['', 'recipe'],
  '/recipes': ['recipes'],
  '/parser': ['parser'],
  '/account': ['account'],
  '/configuration': ['configuration'],
  '/login': ['login'],
  '/logout': ['logout'],
  '/contact': ['contact']
};

export const MinSearchQueryLength = 1;
export const MaxSearchResults = 30;

import keyMirror from 'fbjs/lib/keyMirror';

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
  MultipleRest: null,
  BIAB: null,
  Decoction: null
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
  HopStand: null,
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

export const MinSearchQueryLength = 1;
export const MaxSearchResults = 30;
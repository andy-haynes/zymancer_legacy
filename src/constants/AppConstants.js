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

export const MinSearchQueryLength = 1;
export const MaxSearchResults = 10;
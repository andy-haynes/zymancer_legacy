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

export const MinSearchQueryLength = 1;
export const MaxSearchResults = 10;
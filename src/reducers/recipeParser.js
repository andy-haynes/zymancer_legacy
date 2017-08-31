import RecipeActions from '../constants/RecipeActionTypes';
import uniqBy from 'lodash/uniqBy';

const initialState = {
  text: '',
  recipe: {},
  suggestions: {},
  matchedLines: [],
  selectedLine: -1
};

const recipeParser = (state = initialState, action) => {
  switch (action.type) {
    case RecipeActions.ClearParser:
      return Object.assign({}, state, initialState);

    case RecipeActions.UpdateRecipeText:
      return Object.assign({}, state, {
        text: action.recipeText
      });

    case RecipeActions.SelectIngredientSuggestion:
      const { ingredientKey, matchId, suggestionId } = action;
      return Object.assign({}, state, {
        suggestions: Object.assign({}, state.suggestions, {
          [ingredientKey]: state.suggestions[ingredientKey].map(i => i.id !== matchId ? i : Object.assign({}, i, {
            suggestions: i.suggestions.map(s => Object.assign({}, s, {
              active: s.id === suggestionId
            }))
          }))
        })
      });

    case RecipeActions.SelectParsedIngredient:
      const { lineNumber: selectedLine } = action;
      const suggestions = Object.assign({}, state.suggestions, {
        style: Object.assign({}, state.suggestions.style, {
          selected: state.suggestions.style.lineNumber === selectedLine
        })
      });

      ['grains', 'hops', 'yeast', 'parameters'].forEach(key => {
        suggestions[key] = suggestions[key].map(f => Object.assign({}, f, {
          selected: f.lineNumber === selectedLine
        }))
      });

      return Object.assign({}, state, {
        suggestions,
        selectedLine,
        matchedLines: state.matchedLines.map(line => Object.assign({}, line, {
          selected: line.number === selectedLine
        }))
      });

    case RecipeActions.ParseRecipeText:
      // find all lines that were parsed
      const parsedFields = {};
      if (action.recipe.style) {
        parsedFields[action.recipe.style.lineNumber] = action.recipe.style;
      }
      ['grains', 'hops', 'yeast', 'parameters'].forEach(key => {
        action.recipe[key].forEach(field => parsedFields[field.lineNumber] = field);
      });
      // map lines to whether they matched a field
      const matchedLines = state.text.split('\n')
                                     .filter(line => line)
                                     .map((line, i) => ({
                                       text: line,
                                       number: i,
                                       matched: parsedFields[i] !== undefined,
                                       selected: i === state.selectedLine
                                     }));

      return Object.assign({}, state, {
        matchedLines,
        recipe: action.recipe,
        text: state.text.split('\n').filter(line => line).join('\n'),
        suggestions: Object.assign(action.recipe, {
          grains: uniqBy(action.recipe.grains, g => `${g.name}|${g.lovibond}|${g.gravity}`),
          hops: uniqBy(action.recipe.hops, h => `${h.name}`),
          yeast: uniqBy(action.recipe.yeast, y => `${y.name}|${y.mfg}|${y.code}`)
        })
      });

    default:
      return state;
  }
};

export default recipeParser;

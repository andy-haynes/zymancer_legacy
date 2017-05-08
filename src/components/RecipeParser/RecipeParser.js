import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeParser.css';
import ParsedParameters from '../ParsedParameters';
import ParsedGrain from '../ParsedGrain';
import ParsedHop from '../ParsedHop';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const RecipeParser = ({ parser, searchCache, actions }) => {
  function suggestionToggle(ingredientKey, matchId) {
    return (suggestionId) => actions.selectIngredientSuggestion(ingredientKey, matchId, suggestionId)
  }

  return (
    <div className={s.recipeParser}>
      <div className="pure-g">
        <div className="pure-u-1-2">
          <TextField
            name="recipe-text"
            className={s.recipeText}
            placeholder="Paste recipe text here"
            multiLine={true}
            rows={24}
            style={{width: '100%', height: '750px'}}
            value={parser.text}
            onChange={e => actions.updateRecipeText(e.target.value)}
          />
        </div>
        <div className="pure-u-1-2">
          <div className={s.results}>
            {parser.suggestions.parameters && <ParsedParameters parameters={parser.suggestions.parameters}/>}
            {parser.suggestions.grains && parser.suggestions.grains.map((g, i) => (
              <ParsedGrain
                key={`parsed-grain-${i}`}
                grain={g}
                toggleSuggestion={suggestionToggle('grains', g.id)}
              />
            ))}
            {parser.suggestions.hops && parser.suggestions.hops.map((h, i) => (
              <ParsedHop
                key={`parsed-grain-${i}`}
                hop={h}
                toggleSuggestion={suggestionToggle('hops', h.id)}
              />
            ))}
            {parser.suggestions.yeast && parser.suggestions.yeast.map((y, i) => (
              <Paper className={s.parsedIngredient} key={`parsed-yeast-${i}`}>
                {y.code} | {y.name} | {y.mfg}
                <div className={s.suggestions}>
                  {y.suggestions.map((s, j) => (
                    <div key={`yeast-suggestion-${j}`}>
                      {s.name}
                    </div>
                  ))}
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </div>
      <div className="pure-g">
        <div className="pure-u-1-1">
          <RaisedButton
            label="Load"
            secondary={true}
            style={{float: 'right'}}
            onClick={() => actions.loadParsedRecipe(parser)}
          />
          <RaisedButton
            label="Parse"
            primary={true}
            style={{float: 'right'}}
            onClick={() => actions.parseRecipeText(parser.text, searchCache)}
          />
        </div>
      </div>
    </div>
  );
};

/*
RecipeParser.propTypes = {
};
*/

export default withStyles(s)(RecipeParser);
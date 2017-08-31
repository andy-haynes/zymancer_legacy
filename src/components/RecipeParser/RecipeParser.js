import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeParser.css';
import ParsedParameters from '../ParsedParameters';
import ParsedGrain from '../ParsedGrain';
import ParsedHop from '../ParsedHop';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

class RecipeParser extends React.PureComponent {
  static propTypes = {
    parser: PropTypes.object.isRequired,
    searchCache: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { parser, searchCache, actions } = this.props;
    function suggestionToggle(ingredientKey, matchId) {
      return (suggestionId) => actions.selectIngredientSuggestion(ingredientKey, matchId, suggestionId)
    }

    return (
      <div className={s.recipeParser}>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <div className={s.parserContainer}>
              {!parser.matchedLines.length && (
                <TextField
                  name="recipe-text"
                  className={s.recipeText}
                  placeholder="Paste recipe text here"
                  multiLine={true}
                  underlineShow={false}
                  rows={24}
                  style={{width: '90%', height: '25em', margin: '0.5em'}}
                  value={parser.text}
                  onChange={e => actions.updateRecipeText(e.target.value)}
                />
              )}
              <div className={s.parsedText}>
                {parser.matchedLines.map(line => (
                  <div
                    key={`line-match-${line.number}`}
                    className={line.matched ? (line.selected ? s.selectedLine : s.matchedLine) : s.unmatchedLine}
                    onClick={() => actions.selectParsedIngredient(line.number)}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pure-u-1-2">
            <div className={s.parsed}>
              <div className={s.results}>
                {parser.suggestions.style && (
                  <Paper
                    className={parser.suggestions.style.selected ? s.selectedIngredient : s.parsedIngredient}
                    onClick={() => actions.selectParsedIngredient(parser.suggestions.style.lineNumber)}
                    zDepth={2}
                  >
                    {parser.suggestions.style.name}
                  </Paper>
                )}
                {parser.suggestions.parameters && (
                  <Paper
                    className={s.parsedIngredient}
                    zDepth={2}
                  >
                    <ParsedParameters
                      parameters={parser.suggestions.parameters}
                      actions={{ selectParsedParameter: actions.selectParsedIngredient }}
                    />
                  </Paper>
                )}
                {parser.suggestions.grains && parser.suggestions.grains.map((g, i) => (
                  <Paper
                    key={`parsed-grain-${i}`}
                    className={g.selected ? s.selectedIngredient : s.parsedIngredient}
                    onClick={() => actions.selectParsedIngredient(g.lineNumber)}
                    zDepth={2}
                  >
                    <ParsedGrain
                      grain={g}
                      toggleSuggestion={suggestionToggle('grains', g.id)}
                    />
                  </Paper>
                ))}
                {parser.suggestions.hops && parser.suggestions.hops.map((h, i) => (
                  <Paper
                    key={`parsed-grain-${i}`}
                    className={h.selected ? s.selectedIngredient : s.parsedIngredient}
                    onClick={() => actions.selectParsedIngredient(h.lineNumber)}
                    zDepth={2}
                  >
                    <ParsedHop
                      hop={h}
                      toggleSuggestion={suggestionToggle('hops', h.id)}
                    />
                  </Paper>
                ))}
                {parser.suggestions.yeast && parser.suggestions.yeast.map((y, i) => (
                  <Paper
                    key={`parsed-yeast-${i}`}
                    className={y.selected ? s.selectedIngredient : s.parsedIngredient}
                    onClick={() => actions.selectParsedIngredient(y.lineNumber)}
                    zDepth={2}
                  >
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
                {parser.matchedLines.length > 0 && (
                  <RaisedButton
                    label="Clear"
                    style={{float: 'right'}}
                    onClick={() => actions.clear()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(RecipeParser);

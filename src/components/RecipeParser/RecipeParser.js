import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeParser.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const RecipeParser = ({ parser, searchCache, actions }) => (
  <div className={s.parseRecipe}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <TextField
          name="recipe-text"
          className={s.recipeText}
          placeholder="Paste recipe text here"
          multiLine={true}
          rows={24}
          style={{width: '100%'}}
          value={parser.text}
          onChange={e => actions.updateRecipeText(e.target.value)}
        />
      </div>
      <div className="pure-u-1-2">
        <div className={s.results}>
          {parser.recipe.parameters && parser.recipe.parameters.map((p, i) => (
            <Paper key={`parsed-parameter-${i}`}>
              {p.parameter}: {p.value}
            </Paper>
          ))}
          {parser.recipe.grains && parser.recipe.grains.map((g, i) => (
            <Paper key={`parsed-grain-${i}`}>
              {g.name} | {g.weight.value} {g.weight.unit}
            </Paper>
          ))}
          {parser.recipe.hops && parser.recipe.hops.map((h, i) => (
            <Paper key={`parsed-hop-${i}`}>
              {h.name} | {h.alpha} | {h.additions.length && h.additions[0].minutes}
            </Paper>
          ))}
          {parser.recipe.fermentation && parser.recipe.fermentation.yeasts.map((y, i) => (
            <Paper key={`parsed-yeast-${i}`}>
              {y.code} | {y.name} | {y.mfg}
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
          onClick={() => actions.loadParsedRecipe(parser.recipe)}
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

/*
RecipeParser.propTypes = {
};
*/

export default withStyles(s)(RecipeParser);
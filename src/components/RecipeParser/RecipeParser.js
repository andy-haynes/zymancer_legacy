import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeParser.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'

const RecipeParser = ({ parser, searchCache, actions }) => (
  <div className={s.parseRecipe}>
    <TextField
      name="recipe-text"
      className={s.recipeText}
      placeholder="Paste recipe text here"
      multiLine={true}
      value={parser.text}
      onChange={e => actions.updateRecipeText(e.target.value)}
    />
    <FlatButton
      label="Parse"
      onClick={() => actions.parseRecipeText(parser.text, searchCache)}
    />
  </div>
);

/*
RecipeParser.propTypes = {
};
*/

export default withStyles(s)(RecipeParser);
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recipe.css';
import Measurement from '../Measurement';
import { GrainWeight } from '../../constants/MeasurementUnits';
import { calculateGrainRGB, calculateSRM } from '../../utils/BrewMath';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Link from '../Link';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ImportExport from 'material-ui/svg-icons/communication/import-export';

const Recipe = ({ recipe, loadRecipe }) => (
  <Paper className={s.recipe} zDepth={2}>
    <div className="pure-g">
      <div className="pure-u-1-24"></div>
      <div className="pure-u-10-24">
        <div className={s.recipeName}>
          {recipe.recipeName}
        </div>
      </div>
      <div className="pure-u-3-24">
        <span className={s.recipeLabel}>OG</span>
        <div className={s.recipeValue}>{recipe.originalGravity}</div>
      </div>
      <div className="pure-u-3-24">
        <span className={s.recipeLabel}>IBU</span>
        <div className={s.recipeValue}>{recipe.IBU}</div>
      </div>
      <div className="pure-u-1-24">
        <Link to="/">
          <ImportExport className={s.recipeAction} onClick={loadRecipe} />
        </Link>
      </div>
      <div className="pure-u-1-24">
        <RemoveCircle className={s.recipeAction} />
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-1-24"></div>
      <div className="pure-u-10-24">
        <div className={s.recipeStyle}>
          {recipe.style}
        </div>
      </div>
      <div className="pure-u-3-24">
        <span className={s.recipeLabel}>FG</span>
        <div className={s.recipeValue}>{recipe.finalGravity}</div>
      </div>
      <div className="pure-u-3-24">
        <span className={s.recipeLabel}>ABV</span>
        <div className={s.recipeValue}>{recipe.ABV}%</div>
      </div>
    </div>
  </Paper>
);

/*
Recipe.propTypes = {
};
*/

export default withStyles(s)(Recipe);
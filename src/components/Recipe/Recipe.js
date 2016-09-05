import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recipe.css';
import Measurement from '../Measurement';
import { GrainWeight } from '../../constants/MeasurementUnits';
import { calculateGrainRGB, calculateSRM } from '../../utils/BrewMath';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ImportExport from 'material-ui/svg-icons/communication/import-export';

const Recipe = ({ recipe, loadRecipe }) => (
  <Paper className={s.recipe} zDepth={2}>
    <div className="pure-g">
      <div className="pure-u-1-24">
      </div>
      <div className="pure-u-9-24">
        <div className={s.recipeName}>
          {recipe.recipeName}
        </div>
      </div>
      <div className="pure-u-4-24">
        {recipe.style}
      </div>
      <div className="pure-u-4-24">
        <ImportExport className={s.recipeAction} onClick={loadRecipe} />
      </div>
      <div className="pure-u-5-24">
      </div>
      <div className="pure-u-1-24">
        <RemoveCircle className={s.recipeAction} />
      </div>
    </div>
  </Paper>
);
/*
Recipe.propTypes = {
};
*/
export default withStyles(s)(Recipe);
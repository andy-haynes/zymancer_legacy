import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeHeader.css';
import MeasurementUnits from '../../../constants/MeasurementUnits';
import Defaults from '../../../constants/Defaults';
import { BrewMethod } from '../../../constants/AppConstants';
import Measurement from '../../Measurement';
import round from 'lodash/round';
import zymath from '../../../utils/zymath';
import SliderInput from '../../SliderInput';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { grey200 } from 'material-ui/styles/colors';
import BJCPStyles from '../../../constants/BJCPStyles';

const RecipeHeader = ({ recipe, authenticated, actions }) => (
  <div className={s.recipeHeader}>
    <div className="pure-g">
      <div className="pure-u-1-1" style={{padding: '0 1em'}}>
        <TextField
          id="recipe-name"
          placeholder="Recipe Name"
          value={recipe.name}
          style={{width: '100%'}}
          onChange={e => actions.setRecipeName(e.target.value)}
        />
        <SelectField
          style={{width: '100%'}}
          value={recipe.style.id}
          onChange={(e, i, v) => actions.setRecipeStyle(v)}
        >
          {BJCPStyles.map((style, i) => (
            <MenuItem
              key={i}
              value={style.id}
              primaryText={`${style.code} - ${style.name}`}
            />
          ))}
        </SelectField>
      </div>
      <div>
        <div className="pure-g">
          <div className="pure-u-1-4">
            <div className={s.calculatedParam}>
              <div className={s.headerLabel}>
                OG
              </div>
              <div className={s.calculatedValue}>
                {zymath.formatGravity(recipe.originalGravity)}
              </div>
            </div>
          </div>
          <div className="pure-u-1-4">
            <div className={s.calculatedParam}>
              <div className={s.headerLabel}>
                FG
              </div>
              <div className={s.calculatedValue}>
                {zymath.formatGravity(recipe.finalGravity)}
              </div>
            </div>
          </div>
          <div className="pure-u-1-4">
            <div className={s.calculatedParam} style={{marginLeft: '3em'}}>
              <div className={s.headerLabel}>
                IBU
              </div>
              <div className={s.calculatedValue}>
                {round(recipe.IBU, 1)}
              </div>
            </div>
          </div>
          <div className="pure-u-1-4">
            <div className={s.calculatedParam}>
              <div className={s.headerLabel}>
                ABV
              </div>
              <div className={s.calculatedValue}>
                {recipe.ABV}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(s)(RecipeHeader);
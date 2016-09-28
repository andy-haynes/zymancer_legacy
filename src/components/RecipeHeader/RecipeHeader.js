import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeHeader.css';
import { RecipeVolume } from '../../constants/MeasurementUnits';
import Measurement from '../Measurement';
import { roundTo } from '../../utils/core';
import SliderInput from '../SliderInput';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import ContentSave from 'material-ui/svg-icons/content/save';
import { grey200 } from 'material-ui/styles/colors';
import BJCPStyles from '../../constants/BJCPStyles';

const RecipeHeader = ({ recipe, setRecipeName, setRecipeStyle, setTargetVolume, setBoilVolume, setBoilTime, setEfficiency, saveRecipe }) => (
  <div className={s.recipeHeader}>
    <div>
      <div className="pure-g">
        <div className="pure-u-1-24">
          <ContentSave
            className={s.exportRecipe}
            color={grey200}
            onClick={saveRecipe}
          />
        </div>
        <div className="pure-u-6-24">
          <TextField id="recipe-name" placeholder="Recipe Name" value={recipe.name} onChange={e => setRecipeName(e.target.value)} />
        </div>
        <div className="pure-u-1-24">
          <div className={s.headerLabel}>
            OG
          </div>
        </div>
        <div className="pure-u-2-24">
          <div className={s.calculatedValue}>
            {recipe.originalGravity === 1 ? '1.000' : `${recipe.originalGravity.toString()}000`.substring(0, 5)}
          </div>
        </div>
        <div className="pure-u-1-24">
          <div className={s.headerLabel}>
            IBU
          </div>
        </div>
        <div className="pure-u-2-24">
          <div className={s.calculatedValue}>
            {roundTo(recipe.IBU, 1)}
          </div>
        </div>
        <div className="pure-u-1-24">
          <div className={s.headerLabel}>
            Target
          </div>
        </div>
        <div className="pure-u-3-24">
          <Measurement measurement={recipe.targetVolume} update={setTargetVolume} options={RecipeVolume} />
        </div>
        <div className="pure-u-2-24">
          <div className={s.headerLabel}>
            Efficiency
          </div>
        </div>
        <div className="pure-u-5-24">
          <SliderInput
            value={recipe.efficiency}
            min={25} max={95}
            update={setEfficiency}
            sliderWidth={'3-4'}
            inputWidth={'1-4'}
          />
        </div>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-1-24"></div>
      <div className="pure-u-6-24">
        <SelectField
          value={recipe.style}
          onChange={(e, i, v) => setRecipeStyle(v)}
        >
          {BJCPStyles.map((style, i) => (
            <MenuItem
              key={i}
              value={style.name}
              primaryText={style.code ? `${style.code} - ${style.name}` : style.name}
            />
          ))}
        </SelectField>
      </div>
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          FG
        </div>
      </div>
      <div className="pure-u-2-24">
        <div className={s.calculatedValue}>
          {recipe.finalGravity === 1 ? '1.000' : `${recipe.finalGravity.toString()}000`.substring(0, 5)}
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          ABV
        </div>
      </div>
      <div className="pure-u-2-24">
        <div className={s.calculatedValue}>
          {recipe.ABV}%
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          Boil
        </div>
      </div>
      <div className="pure-u-3-24">
        <Measurement measurement={recipe.boilVolume} update={setBoilVolume} options={RecipeVolume} />
      </div>
      <div className="pure-u-2-24">
        <div className={s.headerLabel}>
          Boil Time
        </div>
      </div>
      <div className="pure-u-5-24">
        <TextField
          id="boil-minutes"
          className={s.recipeInput}
          value={recipe.boilMinutes}
          onChange={e => setBoilTime(e.target.value)}
          style={{width: "40px"}}
        />
      </div>
    </div>
  </div>
);

export default withStyles(s)(RecipeHeader);
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeHeader.css';
import { RecipeVolume } from '../../constants/MeasurementUnits';
import Measurement from '../Measurement';
import { roundTo } from '../../utils/core';
import SliderInput from '../SliderInput';
import TextField from 'material-ui/TextField';
import ContentSave from 'material-ui/svg-icons/content/save';
import { grey200 } from 'material-ui/styles/colors';

const RecipeHeader = ({ recipe, setRecipeName, setTargetVolume, setBoilVolume, setBoilTime, setEfficiency, exportRecipe }) => (
  <div className={s.recipeHeader}>
    <div className={s.headers}>
      <div className="pure-g">
        <div className="pure-u-1-24">
          <ContentSave
            className={s.exportRecipe}
            color={grey200}
            onClick={exportRecipe}
          />
        </div>
        <div className="pure-u-5-24">Recipe Name</div>
        <div className="pure-u-2-24">OG</div>
        <div className="pure-u-2-24">FG</div>
        <div className="pure-u-1-24">IBU</div>
        <div className="pure-u-1-24">ABV</div>
        <div className="pure-u-3-24">Target Volume</div>
        <div className="pure-u-3-24">Boil Volume</div>
        <div className="pure-u-2-24">Boil Time</div>
        <div className="pure-u-4-24">Efficiency</div>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-1-24"></div>
      <div className="pure-u-5-24">
        <TextField id="recipe-name" value={recipe.recipeName} onChange={e => setRecipeName(e.target.value)} />
      </div>
      <div className="pure-u-2-24">
        <div className={s.calculatedValue}>
          {recipe.originalGravity}
        </div>
      </div>
      <div className="pure-u-2-24">
        <div className={s.calculatedValue}>
          {recipe.finalGravity}
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.calculatedValue}>
          {roundTo(recipe.IBU, 1)}
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.calculatedValue}>
          {recipe.ABV}%
        </div>
      </div>
      <div className="pure-u-3-24">
        <Measurement measurement={recipe.targetVolume} update={setTargetVolume} options={RecipeVolume} />
      </div>
      <div className="pure-u-3-24">
        <Measurement measurement={recipe.boilVolume} update={setBoilVolume} options={RecipeVolume} />
      </div>
      <div className="pure-u-2-24">
        <TextField
          id="boil-minutes"
          className={s.recipeInput}
          value={recipe.boilMinutes}
          onChange={e => setBoilTime(e.target.value)}
          style={{width: "40px"}}
        />
      </div>
      <div className="pure-u-4-24">
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
);

export default withStyles(s)(RecipeHeader);
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeHeader.css';
import { RecipeVolume } from '../../constants/MeasurementUnits';
import { MaxEfficiencyPercentage, MinEfficiencyPercentage } from '../../constants/Defaults';
import Measurement from '../Measurement';
import { roundTo } from '../../utils/core';
import { SRMtoRGB, formatGravity } from '../../utils/BrewMath';
import SliderInput from '../SliderInput';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ShareIcon from 'material-ui/svg-icons/social/share';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import ContentSave from 'material-ui/svg-icons/content/save';
import { grey200 } from 'material-ui/styles/colors';
import BJCPStyles from '../../constants/BJCPStyles';

const RecipeHeader = ({ recipe, setRecipeName, setRecipeStyle, setTargetVolume, setBoilVolume, setBoilTime, setEfficiency, saveRecipe }) => (
  <div className={s.recipeHeader}>
    <div className="pure-g">
      <div className="pure-u-6-24">
        <TextField
          id="recipe-name"
          className={s.longInput}
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={e => setRecipeName(e.target.value)}
        />
      </div>
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          OG
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.calculatedValue}>
          {formatGravity(recipe.originalGravity)}
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          IBU
        </div>
      </div>
      <div className="pure-u-1-24">
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
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          Time
        </div>
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
      <div className="pure-u-2-24">
        <div className={s.headerLabel}>
          Method
        </div>
      </div>
      <div className="pure-u-4-24">
        <SelectField value={1} style={{width:"90%"}}>
          <MenuItem value={1} primaryText="All Grain" />
          <MenuItem value={2} primaryText="BiaB" />
          <MenuItem value={3} primaryText="Extract" />
          <MenuItem value={4} primaryText="Partial Mash" />
        </SelectField>
      </div>
      <div className="pure-u-1-24">
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem onClick={saveRecipe} primaryText="Save" leftIcon={<SaveIcon />} />
          <MenuItem primaryText="Share" leftIcon={<ShareIcon />} />
          <Divider />
          <MenuItem primaryText="Reset" leftIcon={<ClearIcon />} />
        </IconMenu>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-6-24">
        <SelectField
          value={recipe.style}
          onChange={(e, i, v) => setRecipeStyle(v)}
          className={s.longInput}
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
      <div className="pure-u-1-24">
        <div className={s.calculatedValue}>
          {formatGravity(recipe.finalGravity)}
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          ABV
        </div>
      </div>
      <div className="pure-u-1-24">
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
      <div className="pure-u-1-24">
        <div className={s.headerLabel}>
          Color
        </div>
      </div>
      <div className="pure-u-2-24" style={{paddingBottom:"8px"}}>
        <div style={{height:"90%", width:"60%", backgroundColor:SRMtoRGB(recipe.SRM)}}></div>
      </div>
      <div className="pure-u-2-24">
        <div className={s.headerLabel}>
          Efficiency
        </div>
      </div>
      <div className="pure-u-5-24">
        <SliderInput
          value={recipe.efficiency}
          min={MinEfficiencyPercentage}
          max={MaxEfficiencyPercentage}
          update={setEfficiency}
          sliderWidth={'3-4'}
          inputWidth={'1-4'}
        />
      </div>
    </div>
  </div>
);

export default withStyles(s)(RecipeHeader);
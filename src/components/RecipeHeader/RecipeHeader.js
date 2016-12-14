import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeHeader.css';
import MeasurementUnits from '../../constants/MeasurementUnits';
import Defaults from '../../constants/Defaults';
import { BrewMethod } from '../../constants/AppConstants';
import Measurement from '../Measurement';
import round from 'lodash/round';
import zymath from '../../utils/zymath';
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

const RecipeHeader = ({ recipe, actions }) => (
  <div className={s.recipeHeader}>
    <div className="pure-g">
      <div className="pure-u-1-1">
        <div className={s.inputBlock} style={{marginRight: '-2.5em'}}>
          <div>
            <TextField
              id="recipe-name"
              className={s.longInput}
              placeholder="Recipe Name"
              value={recipe.name}
              onChange={e => actions.setRecipeName(e.target.value)}
              style={{width: '19em'}}
            />
          </div>
          <div>
            <SelectField
              value={recipe.style.name}
              onChange={(e, i, v) => actions.setRecipeStyle(i + 1)}
              className={s.longInput}
              style={{width: '19.7em'}}
            >
              {BJCPStyles.map((style, i) => (
                <MenuItem
                  key={i}
                  value={style.name}
                  primaryText={`${style.code} - ${style.name}`}
                />
              ))}
            </SelectField>
          </div>
        </div>
        <div className={s.inputBlock} style={{marginRight: '-3.5em'}}>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <div className={s.headerLabel}>
                OG
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.calculatedValue}>
                {zymath.formatGravity(recipe.originalGravity)}
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.headerLabel} style={{marginTop: '0.3em'}}>
                FG
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.calculatedValue}>
                {zymath.formatGravity(recipe.finalGravity)}
              </div>
            </div>
          </div>
        </div>
        <div className={s.inputBlock} style={{marginRight: '-4em'}}>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <div className={s.headerLabel}>
                IBU
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.calculatedValue}>
                {round(recipe.IBU, 1)}
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.headerLabel} style={{marginTop: '0.3em'}}>
                ABV
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.calculatedValue}>
                {recipe.ABV}%
              </div>
            </div>
          </div>
        </div>
        <div className={s.inputBlock} style={{marginRight: '-6em'}}>
          <div className="pure-g">
            <div className="pure-u-1-3">
              <div className={s.headerLabel}>
                Target
              </div>
            </div>
            <div className="pure-u-2-3" style={{marginBottom: '-0.6em'}}>
              <Measurement
                measurement={recipe.targetVolume}
                update={actions.setTargetVolume}
                options={MeasurementUnits.RecipeVolume}
              />
            </div>
            <div className="pure-u-1-3">
              <div className={s.headerLabel}>
                Boil
              </div>
            </div>
            <div className="pure-u-2-3">
              <Measurement
                measurement={recipe.boilVolume}
                update={actions.setBoilVolume}
                options={MeasurementUnits.RecipeVolume}
              />
            </div>
          </div>
        </div>
        <div className={s.inputBlock} style={{marginRight: '-0.3em'}}>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <div className={s.headerLabel}>
                Color
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.beerColor} style={{backgroundColor: zymath.SRMtoRGB(recipe.SRM)}}></div>
            </div>
            <div className="pure-u-1-2" style={{marginTop: '0.6em'}}>
              <div className={s.headerLabel}>
                Time
              </div>
            </div>
            <div className="pure-u-1-2" style={{marginTop: '0.6em'}}>
              <TextField
                id="boil-minutes"
                className={s.recipeInput}
                value={recipe.boilMinutes}
                onChange={e => actions.setBoilTime(e.target.value)}
                style={{width: "3em"}}
              />
            </div>
          </div>
        </div>
        <div className={s.inputBlock}>
          <div className="pure-g">
            <div className="pure-u-6-24">
              <div className={s.headerLabel}>
                Method
              </div>
            </div>
            <div className="pure-u-17-24">
              <SelectField
                value={recipe.method}
                onChange={(e, k, v) => actions.setRecipeMethod(v)}
                style={{width: '80%', marginRight: '-1.5em'}}
                fullWidth
              >
                <MenuItem value={BrewMethod.AllGrain}    primaryText="All Grain   " />
                <MenuItem value={BrewMethod.PartialMash} primaryText="Partial Mash" />
                <MenuItem value={BrewMethod.Extract}     primaryText="Extract     " />
              </SelectField>
            </div>
            <div className="pure-u-1-24">
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem onClick={() => actions.saveRecipe(recipe)} primaryText="Save" leftIcon={<SaveIcon />} />
                <MenuItem primaryText="Share" leftIcon={<ShareIcon />} />
                <Divider />
                <MenuItem primaryText="Reset" leftIcon={<ClearIcon />} />
              </IconMenu>
            </div>
            <div className="pure-u-1-4">
              <div className={s.headerLabel} style={{marginTop: '-0.5em'}}>
                Efficiency
              </div>
            </div>
            <div className="pure-u-3-4" style={{marginTop: '-0.6em'}}>
              <SliderInput
                value={recipe.method === BrewMethod.Extract ? 100 : recipe.efficiency}
                min={Defaults.MinEfficiencyPercentage}
                max={Defaults.MaxEfficiencyPercentage}
                update={actions.setEfficiency}
                sliderWidth={'3-4'}
                inputWidth={'1-4'}
                disabled={recipe.method === BrewMethod.Extract}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(s)(RecipeHeader);
import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeDetails.css';
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

class RecipeDetails extends React.PureComponent {
  static propTypes = {
    recipe: DefinedTypes.recipe.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { recipe, actions } = this.props;
    return (
      <div className={s.recipeHeader}>
        <div className="pure-g" style={{padding: '1% 8%'}}>
          <div className="pure-u-1-1">
            <div className={s.headerLabel}>
              Name
            </div>
            <TextField
              id="recipe-name"
              placeholder="Recipe Name"
              value={recipe.name}
              style={{width: '100%'}}
              onChange={e => actions.setRecipeName(e.target.value)}
              />
          </div>
          <div className="pure-u-1-1">
            <div className={s.headerLabel}>
              Style
            </div>
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
        </div>
        <div className="pure-g" style={{padding: '1% 8%'}}>
          <div className="pure-u-1-2">
            <div className={s.recipeDetail}>
              <div className={s.headerLabel}>
                Target
              </div>
              <Measurement
                measurement={recipe.targetVolume}
                update={actions.setTargetVolume}
                options={MeasurementUnits.RecipeVolume}
                />
            </div>
          </div>
          <div className="pure-u-1-2">
            <div className={s.recipeDetail}>
              <div className={s.headerLabel}>
                Boil
              </div>
              <Measurement
                measurement={recipe.boilVolume}
                update={actions.setBoilVolume}
                options={MeasurementUnits.RecipeVolume}
                />
            </div>
          </div>
        </div>
        <div className="pure-g" style={{padding: '1% 8%'}}>
          <div className="pure-u-1-2">
            <div className={s.recipeDetail}>
              <div className={s.headerLabel}>
                SRM
              </div>
              <div className={s.beerColor} style={{backgroundColor: zymath.SRMtoRGB(recipe.SRM)}}></div>
            </div>
          </div>
          <div className="pure-u-1-2">
            <div className={s.recipeDetail}>
              <div className={s.headerLabel}>
                Boil Minutes
              </div>
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
        <div className="pure-g" style={{padding: '1% 8%'}}>
          <div className="pure-u-1-1">
            <div className={s.headerLabel}>
              Brew Method
            </div>
            <SelectField
              value={recipe.method}
              onChange={(e, k, v) => actions.setRecipeMethod(v)}
              style={{marginRight: '2em'}}
              >
              <MenuItem value={BrewMethod.AllGrain}    primaryText="All Grain   " />
              <MenuItem value={BrewMethod.PartialMash} primaryText="Partial Mash" />
              <MenuItem value={BrewMethod.Extract}     primaryText="Extract     " />
            </SelectField>
          </div>
          <div className="pure-u-1-1">
            <div className={s.headerLabel} style={{margin: '0.45em 0 -0.7em 0'}}>
              Mash Efficiency
            </div>
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
    );
  }
}

export default withStyles(s)(RecipeDetails);
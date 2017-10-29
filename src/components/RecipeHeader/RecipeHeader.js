import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeHeader.css';
import MeasurementUnits from '../../constants/MeasurementUnits';
import { BrewMethod } from '../../constants/AppConstants';
import Measurement from '../Measurement';
import StyleSelection from '../StyleSelection';
import UserMenu from '../UserMenu';
import round from 'lodash/round';
import zymath from '../../utils/zymath';
import SliderInput from '../SliderInput';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { grey200 } from 'material-ui/styles/colors';

class RecipeHeader extends React.PureComponent {
  static propTypes = {
    recipe: DefinedTypes.recipe.isRequired,
    authenticated: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { recipe, configuration, authenticated, actions } = this.props;
    return (
      <div className={s.recipeHeader}>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className={s.inputBlock} style={{marginRight: '1.5em', paddingTop: '1.2em'}}>
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
              <StyleSelection style={recipe.style} setStyle={actions.setRecipeStyle} />
            </div>
            <div className={s.inputBlock} style={{marginRight: '-1.8em'}}>
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <div className={s.headerLabel}>
                    OG
                  </div>
                  <div className={s.calculatedValue}>
                    {zymath.formatGravity(recipe.originalGravity)}
                  </div>
                </div>
                <div className="pure-u-1-1">
                  <div className={s.headerLabel} style={{marginTop: '0.3em'}}>
                    FG
                  </div>
                  <div className={s.calculatedValue}>
                    {zymath.formatGravity(recipe.finalGravity)}
                  </div>
                </div>
              </div>
            </div>
            <div className={s.inputBlock} style={{marginRight: '-2em'}}>
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <div className={s.headerLabel}>
                    IBU
                  </div>
                  <div className={s.calculatedValue}>
                    {round(recipe.IBU, 1)}
                  </div>
                </div>
                <div className="pure-u-1-1">
                  <div className={s.headerLabel} style={{marginTop: '0.3em'}}>
                    ABV
                  </div>
                  <div className={s.calculatedValue}>
                    {recipe.ABV}%
                  </div>
                </div>
              </div>
            </div>
            <div className={s.inputBlock} style={{marginRight: '-6em'}}>
              <div className="pure-g">
                <div className="pure-u-1-1" style={{marginBottom: '-0.6em'}}>
                  <div className={s.headerLabel}>
                    Target Volume
                  </div>
                  <Measurement
                    measurement={recipe.targetVolume}
                    update={actions.setTargetVolume}
                    options={MeasurementUnits.RecipeVolume}
                  />
                </div>
                <div className="pure-u-1-1">
                  <div className={s.headerLabel}>
                    Boil Volume
                  </div>
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
                <div className="pure-u-1-1">
                  <div className={s.headerLabel}>
                    SRM
                  </div>
                  <div className={s.beerColor} style={{backgroundColor: zymath.SRMtoRGB(recipe.SRM)}}></div>
                </div>
                <div className="pure-u-1-1" style={{marginTop: '1.85em'}}>
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
            <div className={s.inputBlock}>
              <div className="pure-g">
                <div className="pure-u-23-24">
                  <div className={s.headerLabel}>
                    Brew Method
                  </div>
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
                  <UserMenu recipe={recipe} authenticated={authenticated} actions={actions} />
                </div>
                <div className="pure-u-1-1" style={{marginTop: '-0.6em'}}>
                  <div className={s.headerLabel} style={{margin: '0.45em 0 -0.7em 0'}}>
                    Mash Efficiency
                  </div>
                  <SliderInput
                    value={recipe.method === BrewMethod.Extract ? 100 : recipe.efficiency}
                    min={configuration.defaults.mash.minEfficiencyPercentage}
                    max={configuration.defaults.mash.maxEfficiencyPercentage}
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
  }
}

export default withStyles(s)(RecipeHeader);

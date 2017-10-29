import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Configuration.css';
import { BrewMethod, Flocculation, HopAdditionType, HopForm } from '../../constants/AppConstants';
import { ConfigSection, MashMethod } from '../../constants/AppConstants';
import Measurement from '../Measurement';
import MeasurementUnits from '../../constants/MeasurementUnits';
import Ratio from '../Ratio';
import StyleSelection from '../StyleSelection';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

class Configuration extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: ConfigSection.Recipe
    };
  }

  select = (section) => {
    this.setState({ selected: section });
  };

  createListItem = (section, text) => (
    <ListItem
      key={section}
      primaryText={text}
      onClick={() => this.select(section)}
      style={{color: this.state.selected === section ? '#0bf' : '#777'}}
    />
  );

  render() {
    const { defaults, constants, formulas, actions } = this.props;
    const { selected } = this.state;
    return (
      <div className={s.configuration}>
        <div className="pure-g">
          <div className="pure-u-1-5">
            <List>
              <ListItem
                primaryText="Defaults"
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                style={{color: '#777'}}
                nestedItems={[
                  this.createListItem(ConfigSection.Recipe, 'Recipe'),
                  this.createListItem(ConfigSection.Fermentables, 'Grain'),
                  this.createListItem(ConfigSection.Hops, 'Hops'),
                  this.createListItem(ConfigSection.Mash, 'Mash'),
                  this.createListItem(ConfigSection.Fermentation, 'Yeast')
                ]}
              />
            </List>
          </div>
          <div className="pure-u-4-5">
            {selected === ConfigSection.Recipe && (
              <div className={s.configSection}>
                <div className={s.configSectionLabel}>
                  Recipe
                </div>
                <div className={s.configControls}>
                  <div className="pure-g">
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Name
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsRecipeName"
                          value={defaults.recipe.name}
                          onChange={(e, v) => actions.recipe.setName(v)}
                          style={{width: '19em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Style
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <StyleSelection style={defaults.recipe.style} setStyle={actions.recipe.setStyle} />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Brew Method
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <SelectField
                          id="defaultsRecipeMethod"
                          value={defaults.recipe.brewMethod}
                          onChange={(e, i, v) => actions.recipe.setBrewMethod(v)}
                          style={{width: '10em'}}
                        >
                          <MenuItem value={BrewMethod.AllGrain} primaryText="All Grain" />
                          <MenuItem value={BrewMethod.PartialMash} primaryText="Partial Mash" />
                          <MenuItem value={BrewMethod.Extract} primaryText="Extract" />
                        </SelectField>
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Target Volume
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.recipe.targetVolume}
                          update={(v) => actions.recipe.setTargetVolume(v)}
                          options={MeasurementUnits.RecipeVolume}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Boil Minutes
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsRecipeBoilMinutes"
                          value={defaults.recipe.boilMinutes}
                          onChange={(e, v) => actions.recipe.setBoilMinutes(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selected === ConfigSection.Fermentables && (
              <div className={s.configSection}>
                <div className={s.configSectionLabel}>
                  Grain
                </div>
                <div className={s.configControls}>
                  <div className="pure-g">
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Weight
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.fermentables.weight}
                          update={actions.fermentables.setWeight}
                          options={MeasurementUnits.GrainWeight}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Gravity
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentablesGravity"
                          value={defaults.fermentables.gravity}
                          onChange={(e, v) => actions.fermentables.setGravity(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Lovibond
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentablesLovibond"
                          value={defaults.fermentables.lovibond}
                          onChange={(e, v) => actions.fermentables.setLovibond(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Degrees Lintner
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentablesLintner"
                          value={defaults.fermentables.lintner}
                          onChange={(e, v) => actions.fermentables.setLintner(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selected === ConfigSection.Hops && (
              <div className={s.configSection}>
                <div className={s.configSectionLabel}>
                  Hops
                </div>
                <div className={s.configControls}>
                  <div className="pure-g">
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Alpha
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsHopsAlpha"
                          value={defaults.hops.alpha}
                          onChange={(e, v) => actions.hops.setAlpha(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Beta
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsHopsBeta"
                          value={defaults.hops.beta}
                          onChange={(e, v) => actions.hops.setBeta(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Form
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <SelectField
                          id="defaultsHopsForm"
                          value={defaults.hops.form}
                          onChange={(e, i, v) => actions.hops.setForm(v)}
                          style={{width: '5em'}}
                        >
                          <MenuItem value={HopForm.Pellet} primaryText={HopForm.Pellet} />
                          <MenuItem value={HopForm.Leaf} primaryText={HopForm.Leaf} />
                        </SelectField>
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Weight
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.hops.weight}
                          update={actions.hops.setWeight}
                          options={MeasurementUnits.HopAdditionWeight}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Minutes
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsHopsMinutes"
                          value={defaults.hops.minutes}
                          onChange={(e, v) => actions.hops.setMinutes(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Addition Type
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <SelectField
                          id="defaultsHopsAdditionType"
                          value={defaults.hops.additionType}
                          onChange={(e, i, v) => actions.hops.setAdditionType(v)}
                          style={{width: '9em'}}
                        >
                          <MenuItem value={HopAdditionType.FirstWort} primaryText="First Wort Hop" />
                          <MenuItem value={HopAdditionType.Boil} primaryText="Boil" />
                          <MenuItem value={HopAdditionType.Whirlpool} primaryText="Whirlpool" />
                          <MenuItem value={HopAdditionType.HopBack} primaryText="Hop Back" />
                          <MenuItem value={HopAdditionType.Dry} primaryText="Dry Hop" />
                        </SelectField>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selected === ConfigSection.Mash && (
              <div className={s.configSection}>
                <div className={s.configSectionLabel}>
                  Mash
                </div>
                <div className={s.configControls}>
                  <div className="pure-g">
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Style
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <SelectField
                          id="defaultsMashStyle"
                          value={defaults.mash.style}
                          onChange={(e, i, v) => actions.mash.setStyle(v)}
                          style={{width: '10em'}}
                        >
                          <MenuItem value={MashMethod.SingleInfusion} primaryText="Single Infusion" />
                          <MenuItem value={MashMethod.BIAB} primaryText="Brew in a Bag" />
                        </SelectField>
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Grain Temperature
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.mash.grainTemp}
                          update={actions.mash.setGrainTemp}
                          options={MeasurementUnits.TemperatureOptions}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Mash Thickness
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Ratio
                          ratio={defaults.mash.mashThickness}
                          antecedentOptions={MeasurementUnits.RecipeVolume}
                          consequentOptions={MeasurementUnits.GrainWeight}
                          update={(v) => actions.mash.setMashThickness(v)}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Grain Absorption
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Ratio
                          ratio={defaults.mash.grainAbsorption}
                          antecedentOptions={MeasurementUnits.RecipeVolume}
                          consequentOptions={MeasurementUnits.GrainWeight}
                          update={(v) => actions.mash.setGrainAbsorption(v)}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Infusion Temperature
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.mash.infusionTemp}
                          update={(v) => actions.mash.setInfusionTemp(v)}
                          options={MeasurementUnits.TemperatureOptions}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Strike Temperature
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.mash.strikeTemp}
                          update={(v) => actions.mash.setStrikeTemp(v)}
                          options={MeasurementUnits.TemperatureOptions}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Mashout Temperature
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.mash.mashoutTemp}
                          update={(v) => actions.mash.setMashoutTemp(v)}
                          options={MeasurementUnits.TemperatureOptions}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Boil Off Rate
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Ratio
                          ratio={defaults.mash.boilOffRate}
                          antecedentOptions={MeasurementUnits.RecipeVolume}
                          consequentOptions={MeasurementUnits.BoilOffTime}
                          update={(v) => actions.mash.setBoilOffRate(v)}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Mash Efficiency %
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsMashEfficiency"
                          value={defaults.mash.efficiency}
                          onChange={(e, v) => actions.mash.setEfficiency(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Maximum Efficiency %
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsMashMaxEfficiencyPercentage"
                          value={defaults.mash.maxEfficiencyPercentage}
                          onChange={(e, v) => actions.mash.setMaxEfficiencyPercentage(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Minimum Efficiency %
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsMashMinEfficiencyPercentage"
                          value={defaults.mash.minEfficiencyPercentage}
                          onChange={(e, v) => actions.mash.setMinEfficiencyPercentage(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selected === ConfigSection.Fermentation && (
              <div className={s.configSection}>
                <div className={s.configSectionLabel}>
                  Yeast
                </div>
                <div className={s.configControls}>
                  <div className="pure-g">
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Pitch Rate
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationPitchRate"
                          value={defaults.fermentation.pitchRate}
                          onChange={(e, v) => actions.fermentation.setPitchRate(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Pitch Quantity
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationPitchQuantity"
                          value={defaults.fermentation.pitchQuantity}
                          onChange={(e, v) => actions.fermentation.setPitchQuantity(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Days Since Manufacture
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationDaysSinceManufacture"
                          value={defaults.fermentation.daysSinceManufacture}
                          onChange={(e, v) => actions.fermentation.setDaysSinceManufacture(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Fermentation Temperature
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <Measurement
                          measurement={defaults.fermentation.temperature}
                          update={actions.fermentation.setTemperature}
                          options={MeasurementUnits.TemperatureOptions}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Alcohol Tolerance %
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationTolerance"
                          value={defaults.fermentation.tolerance}
                          onChange={(e, v) => actions.fermentation.setTolerance(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Attenuation
                      </div>
                    </div>
                    <div className="pure-u-4-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationAttenuation"
                          value={defaults.fermentation.attenuation}
                          onChange={(e, v) => actions.fermentation.setAttenuation(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Maximum Attenuation
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationDaysSinceManufacture"
                          value={defaults.fermentation.maxAttenuation}
                          onChange={(e, v) => actions.fermentation.setMaxAttenuation(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Minimum Attenuation
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationMinAttenuation"
                          value={defaults.fermentation.minAttenuation}
                          onChange={(e, v) => actions.fermentation.setMinAttenuation(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5" />
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Maximum Viability
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationDaysSinceManufacture"
                          value={defaults.fermentation.maxViability}
                          onChange={(e, v) => actions.fermentation.setMaxViability(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configLabel}>
                        Minimum Viability
                      </div>
                    </div>
                    <div className="pure-u-1-5">
                      <div className={s.configValue}>
                        <TextField
                          id="defaultsFermentationMinViability"
                          value={defaults.fermentation.minViability}
                          onChange={(e, v) => actions.fermentation.setMinViability(v)}
                          style={{width: '4em'}}
                        />
                      </div>
                    </div>
                    <div className="pure-u-1-5" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={s.configButtons}>
          <div className="pure-g">
            <div className="pure-u-2-3">&nbsp;</div>
            <div className="pure-u-1-12">
              <RaisedButton label="Save" primary onClick={actions.saveConfig} />
            </div>
            <div className="pure-u-1-12">
              <RaisedButton label="Reset" onClick={actions.resetConfig} />
            </div>
            <div className="pure-u-1-6">
              <RaisedButton label="Restore Defaults" secondary onClick={actions.restoreConfig} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Configuration);

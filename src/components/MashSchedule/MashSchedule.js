import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MashSchedule.css';
import SliderInput from '../SliderInput';
import Measurement from '../Measurement';
import Ratio from '../Ratio';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MeasurementUnits from '../../constants/MeasurementUnits';
import { MashMethod } from '../../constants/AppConstants';

const MashSchedule = ({ mashSchedule, actions }) => (
  <div className={s.mashSchedule}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <Paper className={s.mashControl} zDepth={2}>
          <div className="pure-g">
            <div className="pure-u-3-4">
              <div className={s.mashLabel}>
                Mash Style
              </div>
              <div className={s.mashValue}>
                <SelectField
                  value={mashSchedule.style}
                  onChange={(e, i, v) => actions.setStyle(v)}
                  style={{position: 'relative', top: '4px'}}
                >
                  <MenuItem value={MashMethod.SingleInfusion} primaryText="Single Infusion" />
                  <MenuItem value={MashMethod.BIAB} primaryText="Brew in a Bag" />
                  <MenuItem value={MashMethod.Decoction} primaryText="Decoction" />
                  <MenuItem value={MashMethod.MultipleRest} primaryText="Multi-Rest" />
                </SelectField>
              </div>
            </div>
            <div className="pure-u-1-4">
              <div className={s.mashLabel}>
                Grain Temp
              </div>
              <div className={s.mashValue}>
                <Measurement
                  measurement={mashSchedule.grainTemp}
                  update={actions.setGrainTemp}
                  options={MeasurementUnits.TemperatureOptions}
                />
              </div>
            </div>
          </div>
        </Paper>
        <Paper
          className={s.mashControl}
          zDepth={2}
        >
          <div className="pure-g">
            <div className="pure-u-3-4">
              <div className={s.mashLabel}>
                Strike Temp
              </div>
              <div className={s.mashValue}>
                <SliderInput
                  {...mashSchedule.infusionTemp}
                  step={1}
                  update={(value) => actions.setInfusionTemp(Object.assign({}, mashSchedule.infusionTemp, { value }))}
                  sliderWidth="2-3"
                  inputWidth="1-3"
                >
                  <Measurement
                    measurement={mashSchedule.infusionTemp}
                    update={actions.setInfusionTemp}
                    options={MeasurementUnits.TemperatureOptions}
                  />
                </SliderInput>
              </div>
            </div>
            <div className="pure-u-1-4">
              <div className={s.mashLabel}>
                Addition Temp
              </div>
              <div className={s.mashValue}>
                <Measurement
                  measurement={mashSchedule.strikeTemp}
                  options={MeasurementUnits.TemperatureOptions}
                />
              </div>
            </div>
          </div>
        </Paper>
        <Paper
          className={s.mashControl}
          zDepth={2}
          style={{display: (mashSchedule.style !== MashMethod.BIAB) ? 'block' : 'none'}}
        >
          <div className="pure-g">
            <div className="pure-u-3-4">
              <div className={s.mashLabel}>
                Mash Out Temp
              </div>
              <div className={s.mashValue}>
                <SliderInput
                  {...mashSchedule.mashoutTemp}
                  step={1}
                  update={(value) => actions.setMashoutTemp(Object.assign({}, mashSchedule.mashoutTemp, { value }))}
                  sliderWidth="2-3"
                  inputWidth="1-3"
                >
                  <Measurement
                    measurement={mashSchedule.mashoutTemp}
                    update={actions.setMashoutTemp}
                    options={MeasurementUnits.TemperatureOptions}
                  />
                </SliderInput>
              </div>
            </div>
            <div className="pure-u-1-4">
              <div className={s.mashLabel}>
                Addition Temp
              </div>
              <div className={s.mashValue}>
                <Measurement
                  measurement={mashSchedule.spargeTemp}
                  options={MeasurementUnits.TemperatureOptions}
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <div className="pure-u-1-2">
        <Paper
          className={s.mashControl}
          zDepth={2}
        >
          <div className="pure-g">
            <div className="pure-u-1-2">
              <div className={s.mashLabel}>
                Strike Volume
              </div>
              <div className={s.mashValue}>
                <Measurement
                  measurement={mashSchedule.strikeVolume}
                  options={MeasurementUnits.RecipeVolume}
                />
              </div>
            </div>
            <div
              className="pure-u-1-2"
              style={{display: (mashSchedule.style !== MashMethod.BIAB) ? 'block' : 'none'}}
            >
              <div className={s.mashLabel}>
                Sparge Volume
              </div>
              <div className={s.mashValue}>
                <Measurement
                  measurement={mashSchedule.spargeVolume}
                  options={MeasurementUnits.RecipeVolume}
                />
              </div>
            </div>
          </div>
        </Paper>
        <Paper
          className={s.mashControl}
          zDepth={2}
          style={{display: (mashSchedule.style !== MashMethod.BIAB) ? 'block' : 'none'}}
        >
          <div className={s.mashLabel}>
            Mash Thickness
          </div>
          <div className={s.mashValue}>
            <SliderInput
              {...mashSchedule.thickness}
              step={0.05}
              update={(value) => actions.setThickness({ value })}
              sliderWidth="1-2"
              inputWidth="1-2"
            >
              <Ratio
                ratio={mashSchedule.thickness}
                antecedentOptions={MeasurementUnits.RecipeVolume}
                consequentOptions={MeasurementUnits.MashWeight}
                update={actions.setThickness}
              />
            </SliderInput>
          </div>
        </Paper>
        <Paper className={s.mashControl} zDepth={2}>
          <div className={s.mashLabel}>
            Grain Absorption
          </div>
          <div className={s.mashValue}>
            <SliderInput
              {...mashSchedule.absorption}
              step={0.01}
              update={(value) => actions.setAbsorption({ value })}
              sliderWidth="1-2"
              inputWidth="1-2"
            >
              <Ratio
                ratio={mashSchedule.absorption}
                antecedentOptions={MeasurementUnits.RecipeVolume}
                consequentOptions={MeasurementUnits.MashWeight}
                update={actions.setAbsorption}
              />
            </SliderInput>
          </div>
        </Paper>
        <Paper className={s.mashControl} zDepth={2}>
          <div className={s.mashLabel}>
            Boil Off
          </div>
          <div className={s.mashValue}>
            <SliderInput
              {...mashSchedule.boilOff}
              step={0.1}
              update={(value) => actions.setBoilOff({ value })}
              sliderWidth="1-2"
              inputWidth="1-2"
            >
              <Ratio
                ratio={mashSchedule.boilOff}
                antecedentOptions={MeasurementUnits.RecipeVolume}
                consequentOptions={MeasurementUnits.BoilOffTime}
                update={actions.setBoilOff}
              />
            </SliderInput>
          </div>
        </Paper>
      </div>
    </div>
  </div>
);

/*
MashSchedule.propTypes = {
  grains: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    name:       PropTypes.string.isRequired,
    gravity:    PropTypes.number.isRequired,
    color:      PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick:  PropTypes.func.isRequired
};
*/

export default withStyles(s)(MashSchedule);
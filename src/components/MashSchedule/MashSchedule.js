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

const MashSchedule = ({ style,  thickness, boilOff, absorption, grainTemp, infusionTemp, mashoutTemp, strikeTemp, spargeTemp, strikeVolume, spargeVolume, actions }) => (
  <div className={s.mashSchedule}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <Paper className={s.mashControl} zDepth={2}>
          <div className="pure-g">
            <div className="pure-u-4-24">
              <div className={s.mashLabel}>
                Mash Style
              </div>
            </div>
            <div className="pure-u-10-24">
              <SelectField
                value={style}
                onChange={(e, i, v) => actions.setStyle(v)}
                style={{position: 'relative', top: '4px'}}
              >
                <MenuItem value={MashMethod.SingleInfusion} primaryText="Single Infusion" />
                <MenuItem value={MashMethod.BIAB} primaryText="Brew in a Bag" />
                <MenuItem value={MashMethod.Decoction} primaryText="Decoction" />
                <MenuItem value={MashMethod.MultipleRest} primaryText="Multi-Rest" />
              </SelectField>
            </div>
            <div className="pure-u-4-24">
              <div className={s.mashLabel}>
                Grain Temp
              </div>
            </div>
            <div className="pure-u-6-24">
              <Measurement
                measurement={grainTemp}
                update={actions.setGrainTemp}
                options={MeasurementUnits.TemperatureOptions}
              />
            </div>
          </div>
        </Paper>
        <Paper
          className={s.mashControl}
          zDepth={2}
        >
          <div className="pure-g">
            <div className="pure-u-6-24">
              <div className={s.mashLabel}>
                Strike Water
              </div>
            </div>
            <div className="pure-u-12-24">
              <SliderInput
                value={infusionTemp.value}
                min={110} max={190} step={1}
                update={(value) => actions.setInfusionTemp({ value, unit: infusionTemp.unit })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Measurement
                  measurement={infusionTemp}
                  update={actions.setInfusionTemp}
                  options={MeasurementUnits.TemperatureOptions}
                />
              </SliderInput>
            </div>
            <div className="pure-u-6-24">
              <Measurement
                measurement={strikeTemp}
                options={MeasurementUnits.TemperatureOptions}
              />
            </div>
          </div>
        </Paper>
        <Paper
          className={s.mashControl}
          zDepth={2}
          style={{display: (style !== MashMethod.BIAB) ? 'block' : 'none'}}
        >
          <div className="pure-g">
            <div className="pure-u-6-24">
              <div className={s.mashLabel}>
                Mash Out Temp
              </div>
            </div>
            <div className="pure-u-12-24">
              <SliderInput
                value={mashoutTemp.value}
                min={150} max={212} step={1}
                update={(value) => actions.setMashoutTemp({ value, unit: mashoutTemp.unit })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Measurement
                  measurement={mashoutTemp}
                  update={actions.setMashoutTemp}
                  options={MeasurementUnits.TemperatureOptions}
                />
              </SliderInput>
            </div>
            <div className="pure-u-6-24">
              <Measurement
                measurement={spargeTemp}
                options={MeasurementUnits.TemperatureOptions}
              />
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
            <div className="pure-u-1-6">
              <div className={s.mashLabel}>
                Strike
              </div>
            </div>
            <div className="pure-u-1-3">
              <Measurement
                measurement={strikeVolume}
                options={MeasurementUnits.RecipeVolume}
              />
            </div>
            <div className="pure-u-1-6" style={{display: (style !== MashMethod.BIAB) ? 'block' : 'none'}}>
              <div className={s.mashLabel}>
                Sparge
              </div>
            </div>
            <div className="pure-u-1-3" style={{display: (style !== MashMethod.BIAB) ? 'block' : 'none'}}>
              <Measurement
                measurement={spargeVolume}
                options={MeasurementUnits.RecipeVolume}
              />
            </div>
          </div>
        </Paper>
        <Paper
          className={s.mashControl}
          zDepth={2}
          style={{display: (style !== MashMethod.BIAB) ? 'block' : 'none'}}
        >
          <div className="pure-g">
            <div className="pure-u-1-4">
              <div className={s.mashLabel}>
                Mash Thickness
              </div>
            </div>
            <div className="pure-u-3-4">
              <SliderInput
                value={thickness.value}
                min={0.5} max={3} step={0.05}
                update={(value) => actions.setThickness({ value })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Ratio
                  ratio={thickness}
                  antecedentOptions={MeasurementUnits.RecipeVolume}
                  consequentOptions={MeasurementUnits.GrainWeight}
                  update={actions.setThickness}
                />
              </SliderInput>
            </div>
          </div>
        </Paper>
        <Paper className={s.mashControl} zDepth={2}>
          <div className="pure-g">
            <div className="pure-u-1-4">
              <div className={s.mashLabel}>
                Grain Absorption
              </div>
            </div>
            <div className="pure-u-3-4">
              <SliderInput
                value={absorption.value}
                min={0.05} max={0.3} step={0.01}
                update={(value) => actions.setAbsorption({ value })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Ratio
                  ratio={absorption}
                  antecedentOptions={MeasurementUnits.RecipeVolume}
                  consequentOptions={MeasurementUnits.GrainWeight}
                  update={actions.setAbsorption}
                />
              </SliderInput>
            </div>
          </div>
        </Paper>
        <Paper className={s.mashControl} zDepth={2}>
          <div className="pure-g">
            <div className="pure-u-1-4">
              <div className={s.mashLabel}>
                Boil Off
              </div>
            </div>
            <div className="pure-u-3-4">
              <SliderInput
                value={boilOff.value}
                min={0.1} max={5} step={0.1}
                update={(value) => actions.setBoilOff({ value })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Ratio
                  ratio={boilOff}
                  antecedentOptions={MeasurementUnits.RecipeVolume}
                  consequentOptions={MeasurementUnits.BoilOffTime}
                  update={actions.setBoilOff}
                />
              </SliderInput>
            </div>
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
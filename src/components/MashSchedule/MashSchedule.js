import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MashSchedule.css';
import SliderInput from '../SliderInput';
import Measurement from '../Measurement';
import Ratio from '../Ratio';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { GrainWeight, RecipeVolume, BoilOffTime, TemperatureOptions } from '../../constants/MeasurementUnits';

const MashSchedule = ({
  style,
  thickness,
  boilOff,
  absorption,
  grainTemp,
  infusionTemp,
  mashoutTemp,
  strikeTemp,
  spargeTemp,
  strikeVolume,
  spargeVolume,
  setStyle,
  setThickness,
  setBoilOff,
  setAbsorption,
  setInfusionTemp,
  setMashoutTemp,
  setGrainTemp
}) => (
  <div className={s.mashSchedule}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <Paper className={s.mashControl} zDepth={2}>
          <div className="pure-g">
            <div className="pure-u-1-6">
              <div className={s.mashLabel}>
                Strike
              </div>
            </div>
            <div className="pure-u-1-3">
              <Measurement measurement={strikeVolume} options={RecipeVolume} />
            </div>
            <div className="pure-u-1-6">
              <div className={s.mashLabel}>
                Sparge
              </div>
            </div>
            <div className="pure-u-1-3">
              <Measurement measurement={spargeVolume} options={RecipeVolume} />
            </div>
          </div>
        </Paper>
        <Paper className={s.mashControl} zDepth={2}>
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
                update={(value) => setThickness({ value })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Ratio
                  ratio={thickness}
                  antecedentOptions={RecipeVolume}
                  consequentOptions={GrainWeight}
                  update={setThickness}
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
                update={(value) => setAbsorption({ value })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Ratio
                  ratio={absorption}
                  antecedentOptions={RecipeVolume}
                  consequentOptions={GrainWeight}
                  update={setAbsorption}
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
                update={(value) => setBoilOff({ value })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Ratio
                  ratio={boilOff}
                  antecedentOptions={RecipeVolume}
                  consequentOptions={BoilOffTime}
                  update={setBoilOff}
                />
              </SliderInput>
            </div>
          </div>
        </Paper>
      </div>
      <div className="pure-u-1-2">
        <Paper className={s.mashControl} zDepth={2}>
          <div className="pure-g">
            <div className="pure-u-14-24">
              <div className={s.mashLabel}>
                <SelectField value={style} onChange={(e, i, v) => setStyle(v)}>
                  <MenuItem value="Infusion Sparge" primaryText="Infusion Sparge" />
                  <MenuItem value="Brew in a Bag" primaryText="Brew in a Bag" />
                  <MenuItem value="Decoction" primaryText="Decoction" />
                </SelectField>
              </div>
            </div>
            <div className="pure-u-4-24">
              <div className={s.mashLabel}>
                Grain Temp
              </div>
            </div>
            <div className="pure-u-6-24">
              <Measurement measurement={grainTemp} update={setGrainTemp} options={TemperatureOptions} />
            </div>
          </div>
        </Paper>
        <Paper className={s.mashControl} zDepth={2}>
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
                update={(value) => setInfusionTemp({ value, unit: infusionTemp.unit })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Measurement measurement={infusionTemp} update={setInfusionTemp} options={TemperatureOptions} />
              </SliderInput>
            </div>
            <div className="pure-u-6-24">
              <Measurement measurement={strikeTemp} options={TemperatureOptions} />
            </div>
          </div>
        </Paper>
        <Paper className={s.mashControl} zDepth={2}>
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
                update={(value) => setMashoutTemp({ value, unit: mashoutTemp.unit })}
                sliderWidth="1-2"
                inputWidth="1-2"
              >
                <Measurement measurement={mashoutTemp} update={setMashoutTemp} options={TemperatureOptions} />
              </SliderInput>
            </div>
            <div className="pure-u-6-24">
              <Measurement measurement={spargeTemp} options={TemperatureOptions} />
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
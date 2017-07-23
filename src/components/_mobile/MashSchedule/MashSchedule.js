import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MashSchedule.css';
import SliderInput from '../SliderInput';
import Measurement from '../Measurement';
import Ratio from '../Ratio';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MeasurementUnits from '../../../constants/MeasurementUnits';
import { MashMethod } from '../../../constants/AppConstants';

class MashSchedule extends React.PureComponent {
  static propTypes = {
    mashSchedule: DefinedTypes.mashSchedule.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { mashSchedule, actions } = this.props;
    return (
      <div className={s.mashSchedule}>
        <div className="pure-g" style={{padding: '1% 8%'}}>
          <div className="pure-u-2-3">
            <div className={s.mashLabel}>
              Mash Style
            </div>
            <div className={s.mashValue}>
              <SelectField
                value={mashSchedule.style}
                onChange={(e, i, v) => actions.setStyle(v)}
                style={{width: '12em'}}
              >
                <MenuItem value={MashMethod.SingleInfusion} primaryText="Single Infusion" />
                <MenuItem value={MashMethod.BIAB} primaryText="Brew in a Bag" />
                <MenuItem value={MashMethod.Decoction} primaryText="Decoction" />
                <MenuItem value={MashMethod.MultipleRest} primaryText="Multi-Rest" />
              </SelectField>
            </div>
          </div>
          <div className="pure-u-1-3">
            <div className={s.mashLabel}>
              Grain Temp
            </div>
            <div className={s.mashValue}>
              <Measurement
                measurement={mashSchedule.grainTemp}
                update={actions.setGrainTemp}
                options={MeasurementUnits.TemperatureOptionsShort}
              />
            </div>
          </div>
        </div>
        <div className="pure-g"  style={{padding: '1% 8%'}}>
          <div className="pure-u-1-2">
            <div className={s.mashLabel}>
              Strike Volume
            </div>
            <div className={s.mashValue}>
              <Measurement
                measurement={mashSchedule.strikeVolume}
                options={MeasurementUnits.RecipeVolumeShort}
              />
            </div>
          </div>
          <div className="pure-u-1-2" style={{display: (mashSchedule.style !== MashMethod.BIAB) ? 'block' : 'none'}}>
            <div className={s.mashLabel}>
              Sparge Volume
            </div>
            <div className={s.mashValue}>
              <Measurement
                measurement={mashSchedule.spargeVolume}
                options={MeasurementUnits.RecipeVolumeShort}
              />
            </div>
          </div>
        </div>
        <div className="pure-g" style={{
          padding: '1% 8%',
          borderTop: '1px solid #ccc',
          display: (mashSchedule.style !== MashMethod.BIAB) ? 'block' : 'none'
        }}>
          <div className="pure-u-1-1">
            <div className={s.mashLabel}>
              Mash Thickness
            </div>
            <div className={s.mashValue}>
              <SliderInput
                {...mashSchedule.thickness}
                step={0.05}
                update={(value) => actions.setThickness({ value })}
                sliderWidth="1-1"
                inputWidth="1-1"
                sliderStyle={{margin: '-0.6em 0 -2.5em 0'}}
              >
                <Ratio
                  ratio={mashSchedule.thickness}
                  antecedentOptions={MeasurementUnits.RecipeVolumeShort}
                  consequentOptions={MeasurementUnits.MashWeightShort}
                  update={actions.setThickness}
                />
              </SliderInput>
            </div>
          </div>
        </div>
        <div className="pure-g"  style={{padding: '1% 8%', borderTop: '1px solid #ccc'}}>
          <div className="pure-u-1-1">
            <div className={s.mashLabel}>
              Strike Temp
            </div>
            <div className={s.mashValue}>
              <SliderInput
                {...mashSchedule.infusionTemp}
                step={1}
                update={(value) => actions.setInfusionTemp(Object.assign({}, mashSchedule.infusionTemp, { value }))}
                sliderWidth="1-1"
                inputWidth="1-1"
                sliderStyle={{margin: '-0.6em 0 -2.4em 0'}}
              >
                <div>
                  <Measurement
                    measurement={mashSchedule.infusionTemp}
                    update={actions.setInfusionTemp}
                    options={MeasurementUnits.TemperatureOptionsShort}
                    style={{display: 'inline-block'}}
                  />
                  <div className="pure-g" style={{
                    float: 'right',
                    marginTop: '-0.8em',
                    display: (mashSchedule.style !== MashMethod.BIAB) ? 'inline-block' : 'none'
                  }}>
                    <div className="pure-u-1-1">
                      <div className={s.mashLabel}>
                        Addition Temp
                      </div>
                      <div className={s.mashValue}>
                        <Measurement
                          measurement={mashSchedule.strikeTemp}
                          options={MeasurementUnits.TemperatureOptionsShort}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SliderInput>
            </div>
          </div>
        </div>
        <div className="pure-g" style={{
          padding: '1% 8%',
          borderTop: '1px solid #ccc',
          display: (mashSchedule.style !== MashMethod.BIAB) ? 'block' : 'none'
        }}>
          <div className="pure-u-1-1">
            <div className={s.mashLabel}>
              Mash Out Temp
            </div>
            <div className={s.mashValue}>
              <SliderInput
                {...mashSchedule.mashoutTemp}
                step={1}
                update={(value) => actions.setMashoutTemp(Object.assign({}, mashSchedule.mashoutTemp, { value }))}
                sliderWidth="1-1"
                inputWidth="1-1"
                sliderStyle={{margin: '-0.6em 0 -2.4em 0'}}
              >
                <div>
                  <Measurement
                    measurement={mashSchedule.mashoutTemp}
                    update={actions.setMashoutTemp}
                    options={MeasurementUnits.TemperatureOptionsShort}
                    style={{display: 'inline-block'}}
                  />
                  {/*<div className="pure-g" style={{
                    float: 'right',
                    marginTop: '-0.8em'
                  }}>
                    <div className="pure-u-1-1">
                      <div className={s.mashLabel}>
                        Addition Temp
                      </div>
                      <div className={s.mashValue}>
                        <Measurement
                          measurement={mashSchedule.spargeTemp}
                          options={MeasurementUnits.TemperatureOptionsShort}
                        />
                      </div>
                    </div>
                  </div>*/}
                </div>
              </SliderInput>
            </div>
          </div>
        </div>
        <div className="pure-g" style={{padding: '1% 8%', borderTop: '1px solid #ccc'}}>
          <div className="pure-u-1-1">
            <div className={s.mashLabel}>
              Grain Absorption
            </div>
            <div className={s.mashValue}>
              <SliderInput
                {...mashSchedule.absorption}
                step={0.01}
                update={(value) => actions.setAbsorption({ value })}
                sliderWidth="1-1"
                inputWidth="1-1"
                sliderStyle={{margin: '-0.6em 0 -2.4em 0'}}
              >
                <div>
                  <Ratio
                    ratio={mashSchedule.absorption}
                    antecedentOptions={MeasurementUnits.RecipeVolumeShort}
                    consequentOptions={MeasurementUnits.MashWeightShort}
                    update={actions.setAbsorption}
                    style={{display: 'inline-block'}}
                  />
                  <div className="pure-g" style={{
                    float: 'right',
                    marginTop: '-0.8em'
                  }}>
                    <div className="pure-u-1-1">
                      <div className={s.mashLabel}>
                        Absorption Loss
                      </div>
                      <div className={s.mashValue}>
                        <Measurement
                          measurement={mashSchedule.absorptionLoss}
                          options={MeasurementUnits.RecipeVolumeShort}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SliderInput>
            </div>
          </div>
        </div>
        <div className="pure-g" style={{padding: '1% 8%', borderTop: '1px solid #ccc'}}>
          <div className="pure-u-1-1">
            <div className={s.mashLabel}>
              Boil Off Rate
            </div>
            <div className={s.mashValue}>
              <SliderInput
                {...mashSchedule.boilOff}
                step={0.1}
                update={(value) => actions.setBoilOff({ value })}
                sliderWidth="1-1"
                inputWidth="1-1"
                sliderStyle={{margin: '-0.6em 0 -2.4em 0'}}
              >
                <div>
                  <Ratio
                    ratio={mashSchedule.boilOff}
                    antecedentOptions={MeasurementUnits.RecipeVolumeShort}
                    consequentOptions={MeasurementUnits.BoilOffTimeShort}
                    update={actions.setBoilOff}
                    style={{display: 'inline-block'}}
                  />
                  <div className="pure-g" style={{
                    float: 'right',
                    marginTop: '-0.8em'
                  }}>
                    <div className="pure-u-1-1">
                      <div className={s.mashLabel}>
                        Boil Loss
                      </div>
                      <div className={s.mashValue}>
                        <Measurement
                          measurement={mashSchedule.boilLoss}
                          options={MeasurementUnits.RecipeVolumeShort}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SliderInput>
            </div>
          </div>
        </div>
        <div className="pure-g" style={{padding: '1% 8%', borderTop: '1px solid #ccc'}}>
          <div className="pure-u-1-1">
            <div style={{float: 'right'}}>
              <div className={s.mashLabel}>
                Total Loss
              </div>
              <div className={s.mashValue}>
                <Measurement
                  measurement={mashSchedule.totalLoss}
                  options={MeasurementUnits.RecipeVolumeShort}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MashSchedule);

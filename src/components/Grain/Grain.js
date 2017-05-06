import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Grain.css';
import Measurement from '../Measurement';
import MeasurementUnits from '../../constants/MeasurementUnits';
import { ExtractType } from '../../constants/AppConstants';
import zymath from '../../utils/zymath';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ActionInfo from 'material-ui/svg-icons/action/info';

const Grain = ({ grain, targetVolume, actions, showDetailModal }) => (
  <Paper className={s.grain} zDepth={2}>
    <div className="pure-g">
      <div className="pure-u-1-24">
        <div className={s.grainColor} style={{backgroundColor: zymath.calculateGrainRGB(targetVolume, grain)}}></div>
      </div>
      <div className="pure-u-10-24">
        <div className={s.grainName}>
          {grain.name}
          <ActionInfo onClick={showDetailModal} style={{
            height: '1em',
            width: '1em',
            position: 'relative',
            top: '-0.4em'
          }} />
        </div>
      </div>
      <div className="pure-u-12-24">
        <div className="pure-g">
          <div className="pure-u-1-2" style={{marginTop: '-0.8em'}}>
            <Measurement
              measurement={grain.weight}
              update={(weight) => actions.setWeight(grain, weight)}
              options={MeasurementUnits.GrainWeight}
            />
          </div>
          <div className="pure-u-1-2" style={{marginTop: '-0.8em', display: grain.extractType !== null ? 'block' : 'none'}}>
            <SelectField
              value={grain.extractType}
              onChange={(e, k, v) => actions.setExtractType(grain, v)}
              style={{width: '6em'}}
            >
              <MenuItem value={ExtractType.Dry} primaryText="Dry" />
              <MenuItem value={ExtractType.Liquid} primaryText="Liquid" />
            </SelectField>
          </div>
          <div className="pure-u-1-2" style={{marginTop: '-0.8em', display: grain.extractType !== null ? 'none' : 'block'}}>
            <TextField
              id="lintner-input"
              value={grain.lintner}
              onChange={(e) => actions.setLintner(grain, e.target.value)}
              style={{width: '3em'}}
            />&deg;L
          </div>
          <div className="pure-u-1-2" style={{marginTop: '-0.8em'}}>
            <TextField
              id="gravity-input"
              value={zymath.formatGravity(grain.gravity)}
              onChange={(e) => actions.setGravity(grain, e.target.value)}
              style={{width: '3em'}}
            />
          </div>
          <div className="pure-u-1-2" style={{marginTop: '-0.8em'}}>
            <TextField
              id="lovibond-input"
              value={grain.lovibond}
              onChange={(e) => actions.setLovibond(grain, e.target.value)}
              style={{width: '3em'}}
            />&deg;Lov
          </div>
        </div>
      </div>
      <div className="pure-u-1-24">
        <ContentRemoveCircle
          className={s.removeGrain}
          onClick={() => actions.removeGrain(grain)}
        />
      </div>
    </div>
  </Paper>
);
/*
SelectedGrain.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Grain);
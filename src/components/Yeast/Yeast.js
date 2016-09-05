import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import s from './Yeast.css';
import Measurement from '../Measurement';
import SliderInput from '../SliderInput';
import { GrainWeight } from '../../constants/MeasurementUnits';
import { YeastViabilityMonths } from '../../constants/Defaults';
import dateFormat from 'dateformat';
import { subtractMonthsFromNow } from '../../utils/core';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

const Yeast = ({ yeast, removeYeast, setMfgDate, setAttenuation, setViability, setQuantity, addStarterStep, removeStarterStep }) => (
  <Paper className={s.yeast} zDepth={2}>
    <div className="pure-g">
      <div className="pure-u-18-24">
        <span className={s.yeastName}>{yeast.name}</span>
        <span className={s.yeastMfg}>
          <a href={yeast.url} target="_blank">
            {yeast.mfg} {yeast.code}
          </a>
        </span>
      </div>
      <div className="pure-u-4-24">
        <IconButton>
          <NavigationExpandLess />
        </IconButton>
      </div>
      <div className="pure-u-2-24">
        <IconButton onClick={removeYeast}>
          <ContentRemoveCircle />
        </IconButton>
      </div>
    </div>
    <hr/>
    <div className="pure-g">
      <div className="pure-u-1-12"></div>
      <div className="pure-u-1-6">
        <span className={s.yeastLabel}>Temperature</span>
      </div>
      <div className="pure-u-1-6"></div>
      <div className="pure-u-1-6">
        <span className={s.yeastLabel}>Flocculation</span>
      </div>
      <div className="pure-u-1-6"></div>
      <div className="pure-u-1-6">
        <span className={s.yeastLabel}>Tolerance</span>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-1-12"></div>
      <div className="pure-u-1-6">
        <span className={s.yeastValue}>
          {yeast.tempLowF} &ndash; {yeast.tempHighF} °F
        </span>
      </div>
      <div className="pure-u-1-6"></div>
      <div className="pure-u-1-6">
        <span className={s.yeastValue}>
          {yeast.flocculation}
        </span>
      </div>
      <div className="pure-u-1-6"></div>
      <div className="pure-u-1-6">
        <span className={s.yeastValue}>
          {yeast.tolerance}
        </span>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-1-1">
        <div className={s.yeastDescription}>
          {yeast.description}
        </div>
        <div className={s.yeastStyles}>
          <b>Styles</b> {yeast.styles}
        </div>
      </div>
    </div>
    <hr/>
    <div className="pure-g">
      <div className="pure-u-1-12"></div>
      <div className="pure-u-1-6">
        <span className={s.yeastLabel}>Manufactured</span>
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-1-8">
        <span className={s.yeastLabel}>Viability</span>
      </div>
      <div className="pure-u-1-12">
        <span className={s.yeastLabel}>Quantity</span>
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-1-3">
        <span className={s.yeastLabel}>Attenuation</span>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-1-12"></div>
      <div className="pure-u-1-6">
        <DatePicker
          id="yeast-mfg-date"
          value={yeast.mfgDate}
          onChange={(e, date) => setMfgDate(date)}
          hintText="Mfg Date"
          textFieldStyle={{width: '90px'}}
          /*minDate={subtractMonthsFromNow(YeastViabilityMonths)}*/
          maxDate={new Date()}
          formatDate={(d) => dateFormat(d, 'd mmm yy')}
          autoOk
          disableYearSelection
        />
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-1-8">
        <TextField
          id="yeast-viability"
          value={yeast.viability}
          onChange={(e) => setViability(e.target.value)}
          style={{width: '36px'}}
        />%
      </div>
      <div className="pure-u-1-12">
        <TextField
          id="yeast-quantity"
          value={yeast.quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{width: '24px'}}
        />
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-1-3">
        <SliderInput
          value={yeast.attenuation}
          update={setAttenuation}
          min={yeast.attenuationLow}
          max={yeast.attenuationHigh}
          step={0.1}
        />
      </div>
    </div>
  </Paper>
);
/*
Yeast.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Yeast);
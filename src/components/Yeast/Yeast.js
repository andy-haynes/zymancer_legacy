import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import s from './Yeast.css';
import Measurement from '../Measurement';
import SliderInput from '../SliderInput';
import { YeastViabilityMonths } from '../../constants/Defaults';
import dateFormat from 'dateformat';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

const Yeast = ({ yeast, removeYeast, setMfgDate, setApparentAttenuation, setViability, setQuantity, addStarterStep, removeStarterStep }) => (
  <Paper className={s.yeast} zDepth={2}>
    <div className="pure-g">
      <div className="pure-u-11-24">
        <span className={s.yeastName}>{yeast.name}</span>
        <br/>
        <span className={s.yeastMfg}>
          <a href={yeast.url} target="_blank">
            {yeast.mfg} {yeast.code}
          </a>
        </span>
      </div>
      <div className="pure-u-4-24">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className={s.yeastLabel}>Manufactured</div>
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
        </div>
      </div>
      <div className="pure-u-3-24">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className={s.yeastLabel}>Viability</div>
            <TextField
              id="yeast-viability"
              value={yeast.viability}
              onChange={(e) => setViability(e.target.value)}
              style={{width: '36px'}}
            />%
          </div>
        </div>
      </div>
      <div className="pure-u-2-24">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className={s.yeastLabel}>Quantity</div>
            <TextField
              id="yeast-quantity"
              value={yeast.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{width: '24px', marginLeft: '12px'}}
            />
          </div>
        </div>
      </div>
      <div className="pure-u-2-24"></div>
      <div className="pure-u-1-24">
        <IconButton>
          <NavigationExpandLess />
        </IconButton>
      </div>
      <div className="pure-u-1-24">
        <IconButton onClick={removeYeast}>
          <ContentRemoveCircle />
        </IconButton>
      </div>
    </div>
    <hr/>
    <div className="pure-g">
      <div className="pure-u-1-1">
        <div className={s.yeastDescription}>
          {yeast.description}
        </div>
        {!!yeast.styles.length && (<div className={s.styleHeader}>Styles</div>)}
        <div className={s.yeastStyles}>
          {yeast.styles}
        </div>
      </div>
    </div>
    <hr/>
    <div className="pure-g">
      <div className="pure-u-1-3">
        <span className={s.yeastLabel}>Attenuation</span>
      </div>
      <div className="pure-u-1-12"></div>
      <div className="pure-u-1-6">
        <div className={s.yeastLabel}>Temperature</div>
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-1-6">
        <div className={s.yeastLabel}>Flocculation</div>
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-1-6">
        <div className={s.yeastLabel}>Tolerance</div>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-8-24">
        <SliderInput
          value={yeast.apparentAttenuation}
          update={setApparentAttenuation}
          min={yeast.attenuationRange.low}
          max={yeast.attenuationRange.high}
          step={0.1}
          style={{paddingBottom: '16px', height: '40px'}}
        />
      </div>
      <div className="pure-u-2-24"></div>
      <div className="pure-u-4-24">
        <div className={s.yeastValue}>
          {yeast.rangeF.toString()} °F
        </div>
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-4-24">
        <div className={s.yeastValue}>
          {yeast.flocculation}
        </div>
      </div>
      <div className="pure-u-1-24"></div>
      <div className="pure-u-4-24">
        <div className={s.yeastValue}>
          {yeast.tolerance}
        </div>
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
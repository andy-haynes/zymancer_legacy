import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import s from './Yeast.css';
import Measurement from '../Measurement';
import SliderInput from '../SliderInput';
import { YeastViabilityMonths } from '../../constants/Defaults';
import dateFormat from 'dateformat';
import Collapse from 'react-collapse';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Yeast extends React.Component {
  static propTypes = {
    yeast: DefinedTypes.yeast.isRequired,
    actions: PropTypes.object.isRequired,
    showDetailModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { expanded: true };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { yeast, actions, showDetailModal } = this.props;
    return (
      <Paper className={s.yeast} zDepth={2}>
        <div className="pure-g">
          <div className="pure-u-11-24">
            <span className={s.yeastName}>{yeast.name}</span>
            <ActionInfo onClick={showDetailModal} style={{
              height: '1em',
              width: '1em',
              position: 'relative',
              top: '-0.6em'
            }} />
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
                  onChange={(e, date) => actions.setMfgDate(yeast, date)}
                  hintText="Mfg Date"
                  textFieldStyle={{width: '5em'}}
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
                  onChange={(e) => actions.setViability(yeast, e.target.value)}
                  style={{width: '3em'}}
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
                  onChange={(e) => actions.setQuantity(yeast, e.target.value)}
                  style={{width: '2em', marginLeft: '1em'}}
                  />
              </div>
            </div>
          </div>
          <div className="pure-u-2-24"></div>
          <div className="pure-u-1-24">
            <IconButton onClick={this.toggleExpand}>
              {this.state.expanded && <NavigationExpandLess />}
              {!this.state.expanded && <NavigationExpandMore />}
            </IconButton>
          </div>
          <div className="pure-u-1-24">
            <IconButton onClick={() => actions.removeYeast(yeast)}>
              <ContentRemoveCircle />
            </IconButton>
          </div>
        </div>
        <Collapse className={s.expandable} isOpened={this.state.expanded}>
          <div className="pure-g">
            <div className="pure-u-1-1">
              <div className={s.yeastDescription}>
                {yeast.description}
              </div>
              <div className={s.yeastStyles}>
                {yeast.styles}
              </div>
            </div>
          </div>
        </Collapse>
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
        <div className="pure-g" style={{marginTop: '-1em'}}>
          <div className="pure-u-8-24">
            <SliderInput
              value={yeast.apparentAttenuation}
              update={(v) => actions.setApparentAttenuation(yeast, v)}
              min={yeast.attenuationLow}
              max={yeast.attenuationHigh}
              step={0.1}
              style={{paddingBottom: '16px', height: '40px'}}
            />
          </div>
          <div className="pure-u-2-24"></div>
          <div className="pure-u-4-24">
            <div className={s.yeastValue}>
              {yeast.temperatureLow || '–'}
              {(yeast.temperatureHigh || '') && ' - ' + yeast.temperatureHigh}
              {(yeast.temperatureLow || '') && ' °F'}
            </div>
          </div>
          <div className="pure-u-1-24"></div>
          <div className="pure-u-4-24">
            <div className={s.yeastValue}>
              {yeast.flocculation || '–'}
            </div>
          </div>
          <div className="pure-u-1-24"></div>
          <div className="pure-u-4-24">
            <div className={s.yeastValue}>
              {yeast.toleranceLow || '–'}
              {(yeast.toleranceHigh || '') && ' - ' + yeast.toleranceHigh}
              {(yeast.toleranceLow || '') && '%'}
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}
/*
Yeast.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Yeast);
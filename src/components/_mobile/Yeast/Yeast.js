import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import s from './Yeast.css';
import Measurement from '../Measurement';
import SliderInput from '../SliderInput';
import dateFormat from 'dateformat';
import Collapse from 'react-collapse';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

class Yeast extends React.Component {
  static propTypes = {
    yeast: DefinedTypes.yeast.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { expanded: true };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { yeast, actions } = this.props;
    return (
      <div className={s.yeast}>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <span className={s.yeastName}>{yeast.name}</span>
          </div>
          <div className="pure-u-1-1">
            <div className={s.yeastMfg} style={{float: 'left'}}>
              <a href={yeast.url} target="_blank">
                {yeast.mfg} {yeast.code}
              </a>
            </div>
            <div style={{float: 'right'}}>
              <IconButton onClick={this.toggleExpand}>
                {this.state.expanded && <NavigationExpandLess />}
                {!this.state.expanded && <NavigationExpandMore />}
              </IconButton>
            </div>
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
          <div className="pure-u-2-5">
            <div className={s.yeastLabel}>Manufactured</div>
            <DatePicker
              id="yeast-mfg-date"
              value={yeast.mfgDate}
              onChange={(e, date) => actions.setMfgDate(yeast, date)}
              hintText="Mfg Date"
              textFieldStyle={{width: '5em'}}
              maxDate={new Date()}
              formatDate={(d) => dateFormat(d, 'd mmm yy')}
              autoOk
              disableYearSelection
              />
          </div>
          <div className="pure-u-2-5">
            <div className={s.yeastLabel}>Viability</div>
            <TextField
              id="yeast-viability"
              value={yeast.viability}
              onChange={(e) => actions.setViability(yeast, e.target.value)}
              style={{width: '3em'}}
              />%
          </div>
          <div className="pure-u-1-5">
            <div className={s.yeastLabel}>Quantity</div>
            <TextField
              id="yeast-quantity"
              value={yeast.quantity}
              onChange={(e) => actions.setQuantity(yeast, e.target.value)}
              style={{width: '2em', marginLeft: '1em'}}
            />
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-3">
            <div className={s.yeastLabel}>Temperature</div>
            <div className={s.yeastValue}>
              {yeast.temperatureLow || '–'}
              {(yeast.temperatureHigh || '') && ' - ' + yeast.temperatureHigh}
              {(yeast.temperatureLow || '') && ' °F'}
            </div>
          </div>
          <div className="pure-u-1-3">
            <div className={s.yeastLabel}>Flocculation</div>
            <div className={s.yeastValue}>
              {yeast.flocculation || '–'}
            </div>
          </div>
          <div className="pure-u-1-3">
            <div className={s.yeastLabel}>Tolerance</div>
            <div className={s.yeastValue}>
              {yeast.toleranceLow || '–'}
              {(yeast.toleranceHigh || '') && ' - ' + yeast.toleranceHigh}
              {(yeast.toleranceLow || '') && '%'}
            </div>
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <span className={s.yeastLabel}>Attenuation</span>
            <SliderInput
              value={yeast.apparentAttenuation}
              update={(v) => actions.setApparentAttenuation(yeast, v)}
              min={yeast.attenuationLow}
              max={yeast.attenuationHigh}
              step={0.1}
              style={{paddingBottom: '16px', height: '40px'}}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Yeast);

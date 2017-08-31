import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedHop.css';
import Measurement from '../Measurement';
import HopAddition from '../HopAddition';
import ParsedSuggestion from '../ParsedSuggestion';
import round from 'lodash/round';
import pick from 'lodash/pick';
import zymath from '../../utils/zymath';
import Collapse from 'react-collapse';
import { HopForm } from '../../constants/AppConstants';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

class ParsedHop extends React.Component {
  static propTypes = {
    hop: DefinedTypes.hop.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { hop, actions } = this.props;
    return (
      <div className={s.hop}>
        <div className="pure-g">
          <div className="pure-u-2-24">
          </div>
          <div className="pure-u-7-24">
            <div className={s.hopName}>
              {hop.name}
            </div>
          </div>
          <div className="pure-u-6-24">
            <div className={s.greekLabel}>α</div>
            <TextField
              id="hop-alpha"
              className={s.hopInput}
              value={hop.alpha}
              onChange={e => actions.setAlpha(hop, e.target.value)}
            />
            <div className={s.greekLabel}>β</div>
            <TextField
              id="hop-beta"
              className={s.hopInput}
              value={hop.beta}
              onChange={e => actions.setBeta(hop, e.target.value)}
            />
          </div>
          <div className="pure-u-6-24">
            <SelectField
              value={hop.form}
              onChange={(e, i, v) => actions.setHopForm(hop, v)}
              style={{width: '8.1em'}}
            >
              <MenuItem primaryText='Pellet' value={HopForm.Pellet} />
              <MenuItem primaryText='Whole Leaf' value={HopForm.Leaf} />
            </SelectField>
          </div>
          <div className="pure-u-3-24">
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className={s.suggestions}>
              {hop.suggestions.map((suggestion, i) => (
                <ParsedSuggestion
                  key={`grain-suggestion-${i}`}
                  suggestion={suggestion}
                  toggle={() => this.props.toggleSuggestion(suggestion.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <Collapse isOpened={false}>
          <div className="pure-g">
            <div className="pure-u-5-24">
              <div className={s.detailLabel}>
                Quantity
              </div>
            </div>
            <div className="pure-u-8-24">
              <div className={s.detailLabel}>
                Minutes
              </div>
            </div>
            <div className="pure-u-5-24" style={{paddingLeft: '0.3em'}}>
              <div className={s.detailLabel}>
                Addition
              </div>
            </div>
            <div className="pure-u-2-24">
              <div className={s.detailLabel} style={{paddingLeft: '0.8em'}}>
                IBU
              </div>
            </div>
            <div className="pure-u-2-24">
              <div className={s.detailLabel} style={{paddingLeft: '0.8em'}}>
                Util
              </div>
            </div>
          </div>
          {/*hop.additions.map(addition => (
            <HopAddition
              key={addition.id}
              hop={hop}
              originalGravity={originalGravity}
              boilVolume={boilVolume}
              boilMinutes={boilMinutes}
              addition={addition}
              actions={pick(actions, 'setAdditionType', 'setAdditionTime', 'setAdditionWeight', 'removeAddition')}
            />
          ))*/}
        </Collapse>
      </div>
    );
  }
}

export default withStyles(s)(ParsedHop);

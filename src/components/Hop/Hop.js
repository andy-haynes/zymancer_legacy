import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hop.css';
import Measurement from '../Measurement';
import HopAddition from '../HopAddition';
import round from 'lodash/round';
import pick from 'lodash/pick';
import zymath from '../../utils/zymath';
import Collapse from 'react-collapse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

class Hop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: true };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { hop, boilVolume, originalGravity, boilMinutes, actions } = this.props;
    return (
      <Paper className={s.hop} zDepth={2}>
        <div className="pure-g">
          <div className="pure-u-2-24">
            <IconButton onClick={this.toggleExpand}>
              {this.state.expanded && <NavigationExpandLess />}
              {!this.state.expanded && <NavigationExpandMore />}
            </IconButton>
          </div>
          <div className="pure-u-7-24">
            <div className={s.hopName}>
              {hop.name}
            </div>
          </div>
          <div className="pure-u-4-24">
            α &nbsp;
            <TextField
              id="hop-alpha"
              className={s.hopInput}
              value={hop.alpha}
              onChange={e => actions.setAlpha(hop, e.target.value)}
            />
          </div>
          <div className="pure-u-4-24">
            β &nbsp;
            <TextField
              id="hop-beta"
              className={s.hopInput}
              value={hop.beta}
              onChange={e => actions.setBeta(hop, e.target.value)}
            />
          </div>
          <div className="pure-u-4-24">
            <div className="pure-g">
              <div className="pure-u-1-2">
                <div className={s.hopDetail}>
                  <div className={s.detailLabel}>IBU</div>
                  {round(zymath.calculateTotalIBU(boilVolume, originalGravity, [hop]), 1)}
                </div>
              </div>
              <div className="pure-u-1-2">
                <div className={s.hopDetail}>
                  <div className={s.detailLabel}>Util</div>
                  {round(zymath.calculateTotalUtilization(hop.additions, originalGravity), 2)}
                </div>
              </div>
            </div>
          </div>
          <div className="pure-u-3-24">
            <div className={s.addRemoveHop}>
              <ContentAddCircle className={s.addAddition} onClick={() => actions.addAddition(hop, boilMinutes)}/>
              <ContentRemoveCircle className={s.removeHop} onClick={() => actions.removeHop(hop)}/>
            </div>
          </div>
        </div>
        <Collapse isOpened={this.state.expanded}>
          {hop.additions.map(addition => (
            <HopAddition
              key={addition.id}
              hop={hop}
              originalGravity={originalGravity}
              boilVolume={boilVolume}
              boilMinutes={boilMinutes}
              addition={addition}
              actions={pick(actions, 'setAdditionTime', 'setAdditionWeight', 'removeAddition')}
            />
          ))}
        </Collapse>
      </Paper>
    );
  }
}
/*
Hop.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Hop);
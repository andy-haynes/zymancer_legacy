import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hop.css';
import Measurement from '../Measurement';
import HopAddition from '../HopAddition';
import round from 'lodash/round';
import pick from 'lodash/pick';
import zymath from '../../utils/zymath';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

const Hop = ({ hop, originalGravity, boilVolume, actions }) => (
  <Paper className={s.hop} zDepth={2}>
    <div className={s.hopDetailRow}>
      <div className="pure-g">
        <div className="pure-u-1-24">
          <div className={s.expandAdditions}>
            <NavigationExpandLess />
          </div>
        </div>
        <div className="pure-u-8-24">
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
            <ContentAddCircle className={s.addAddition} onClick={() => actions.addAddition(hop)} />
            <ContentRemoveCircle className={s.removeHop} onClick={() => actions.removeHop(hop)} />
          </div>
        </div>
      </div>
    </div>
    {hop.additions.map(addition => (
      <HopAddition
        key={addition.id}
        hop={hop}
        originalGravity={originalGravity}
        boilVolume={boilVolume}
        addition={addition}
        actions={pick(actions, 'setAdditionTime', 'setAdditionWeight', 'removeAddition')}
      />
    ))}
  </Paper>
);
/*
Hop.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Hop);
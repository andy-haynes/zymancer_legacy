import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hop.css';
import Measurement from '../Measurement';
import HopAddition from '../HopAddition';
import _ from 'lodash';
import zymath from '../../utils/zymath';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

const Hop = ({ hop, originalGravity, boilVolume, setAlpha, setBeta, removeHop, addAddition, setAdditionTime, setAdditionWeight, removeAddition }) => (
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
            onChange={e => setAlpha(hop, e.target.value)}
          />
        </div>
        <div className="pure-u-4-24">
          β &nbsp;
          <TextField
            id="hop-beta"
            className={s.hopInput}
            value={hop.beta}
            onChange={e => setBeta(hop, e.target.value)}
          />
        </div>
        <div className="pure-u-4-24">
          <div className="pure-g">
            <div className="pure-u-1-2">
              <div className={s.hopDetail}>
                <div className={s.detailLabel}>IBU</div>
                {_.round(zymath.calculateTotalIBU(boilVolume, originalGravity, [hop]), 1)}
              </div>
            </div>
            <div className="pure-u-1-2">
              <div className={s.hopDetail}>
                <div className={s.detailLabel}>Util</div>
                {_.round(zymath.calculateTotalUtilization(hop.additions, originalGravity), 2)}
              </div>
            </div>
          </div>
        </div>
        <div className="pure-u-3-24">
          <div className={s.addRemoveHop}>
            <ContentAddCircle className={s.addAddition} onClick={addAddition} />
            <ContentRemoveCircle className={s.removeHop} onClick={removeHop} />
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
        setAdditionTime={setAdditionTime}
        setAdditionWeight={setAdditionWeight}
        removeAddition={removeAddition}
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
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import s from './Ratio.css';

const Ratio = ({ ratio, antecedentOptions, consequentOptions, update }) => (
  <div className={s.ratio}>
    <TextField
      id="ratio-input"
      value={ratio.value}
      onChange={(e) => update(e.target.value)}
      style={{width: '52px', position: 'relative', bottom: '4px'}}
    />
    <SelectField
      className={s.ratioUnit}
      value={ratio.antecedent}
      onChange={(e, i, v) => update({ antecedent: v })}
      style={{width: '65px'}}
    >
      {antecedentOptions.map(option => (
        <MenuItem key={option.order} value={option.value} primaryText={option.name} />
      ))}
    </SelectField>
    &nbsp;&nbsp;
    <span style={{position: 'relative', top: '6px', fontSize: '32px', fontWeight: '100'}}>/</span>
    &nbsp;&nbsp;
    <SelectField
      className={s.ratioUnit}
      value={ratio.consequent}
      onChange={(e, i, v) => update({ consequent: v })}
      style={{width: '65px'}}
    >
      {consequentOptions.map(option => (
        <MenuItem key={option.order} value={option.value} primaryText={option.name} />
      ))}
    </SelectField>
  </div>
);

/*
Ratio.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Ratio);
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import s from './Measurement.css';

const Measurement = ({ measurement, update, options }) => (
  <div className={s.measurement}>
    <TextField
      name="measurement-value"
      className={s.measurementValue}
      value={measurement.value === 0 ? '' : measurement.value}
      onChange={e => update({ value: e.target.value, unit: measurement.unit })}
      style={{width: "3em"}}
    />
    <SelectField
      className={s.measurementUnit}
      value={measurement.unit}
      onChange={(e, i, v) => update({ value: measurement.value, unit: v })}
      style={{width: "4em"}}
    >
      {options.map(option => (
        <MenuItem key={option.order} value={option.value} primaryText={option.name} />
      ))}
    </SelectField>
  </div>
);

/*
Measurement.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Measurement);
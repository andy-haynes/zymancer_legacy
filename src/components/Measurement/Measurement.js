import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import s from './Measurement.css';

class Measurement extends React.PureComponent {
  static propTypes = {
    measurement: DefinedTypes.measurement.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    update: PropTypes.func,
    disabled: PropTypes.bool
  };

  render() {
    const { measurement, update, options, disabled = false } = this.props;
    return (
      <div className={s.measurement}>
        <TextField
          name="measurement-value"
          className={s.measurementValue}
          value={measurement.value === 0 ? '' : measurement.value}
          onChange={e => update(Object.assign({}, measurement, { value: e.target.value }))}
          style={{width: "3em"}}
          disabled={disabled}
        />
        <SelectField
          className={s.measurementUnit}
          value={measurement.unit}
          onChange={(e, i, v) => update(Object.assign({}, measurement, { unit: v }))}
          style={{width: "4em"}}
        >
          {options.map(option => (
            <MenuItem key={option.order} value={option.value} primaryText={option.name} />
          ))}
        </SelectField>
      </div>
    );
  }
}

export default withStyles(s)(Measurement);
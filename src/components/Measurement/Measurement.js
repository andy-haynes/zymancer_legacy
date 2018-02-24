import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import helpers from '../../utils/helpers';
import s from './Measurement.css';

class Measurement extends React.PureComponent {
  static propTypes = {
    measurement: DefinedTypes.measurement.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    update: PropTypes.func,
    disabled: PropTypes.bool
  };

  render() {
    const { measurement, update, options, selectWidth = '4em', selectMenuWidth = '6em', disabled = false } = this.props;
    return (
      <div className={s.measurement}>
        <TextField
          name='measurement-value'
          value={helpers.displayMeasurementValue(measurement.value)}
          onChange={e => update(Object.assign({}, measurement, { value: e.target.value }))}
          style={{width: '3em'}}
          disabled={disabled}
        />
        <SelectField
          value={measurement.unit}
          onChange={(e, i, v) => update(Object.assign({}, measurement, { unit: v }))}
          style={{width: selectWidth, top: '1.7em'}}
          labelStyle={{textOverflow: 'none'}}
          menuStyle={{width: selectMenuWidth}}
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

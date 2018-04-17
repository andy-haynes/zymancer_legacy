import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import s from './MeasurementUnit.css';

class Ratio extends React.PureComponent {
  static propTypes = {
    unit: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(DefinedTypes.measurementOption).isRequired,
    update: PropTypes.func.isRequired
  };

  render() {
    const { unit, options, update } = this.props;
    const maxUnitLength = options.reduce((max, option) => Math.max(max, option.name.length), 0);
    return (
      <SelectField
        value={unit}
        onChange={(e, i, v) => update(v)}
        disabled={options.length === 1}
        style={{width: `${maxUnitLength + 0.5}em`}}
      >
        {options.map(option => (
          <MenuItem key={option.order} value={option.value} primaryText={option.name} />
        ))}
      </SelectField>
    );
  }
}

export default withStyles(s)(Ratio);

import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import MeasurementUnit from '../MeasurementUnit';
import helpers from '../../utils/helpers';
import s from './Ratio.css';

class Ratio extends React.PureComponent {
  static propTypes = {
    ratio: DefinedTypes.ratio.isRequired,
    antecedentOptions: PropTypes.arrayOf(DefinedTypes.measurementOption).isRequired,
    consequentOptions: PropTypes.arrayOf(DefinedTypes.measurementOption).isRequired,
    update: PropTypes.func.isRequired
  };

  render() {
    const { ratio, antecedentOptions, consequentOptions, update } = this.props;
    const updateRatio = (changed) => update(Object.assign({}, ratio, changed));
    return (
      <div className={s.ratio}>
        <TextField
          id="ratio-input"
          value={helpers.displayMeasurementValue(ratio.value)}
          onChange={(e) => updateRatio({ value: e.target.value })}
          style={{width: '3.5em', position: 'relative', bottom: '1.7em'}}
        />
        <MeasurementUnit
          unit={ratio.antecedent}
          update={(unit) => updateRatio({ antecedent: unit })}
          options={antecedentOptions}
        />
        &nbsp;&nbsp;
        <span style={{position: 'relative', top: '-0.6em', fontSize: '2em', fontWeight: '100', color: '#bbb'}}>/</span>
        &nbsp;&nbsp;
        <MeasurementUnit
          unit={ratio.consequent}
          update={(unit) => updateRatio({ consequent: unit })}
          options={consequentOptions}
        />
      </div>
    );
  }
}

export default withStyles(s)(Ratio);

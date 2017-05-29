import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
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
    return (
      <div className={s.ratio}>
        <TextField
          id="ratio-input"
          value={helpers.displayMeasurementValue(ratio.value)}
          onChange={(e) => update({ value: e.target.value })}
          style={{width: '52px', position: 'relative', bottom: '4px'}}
        />
        <SelectField
          className={s.ratioUnit}
          value={ratio.antecedent}
          onChange={(e, i, v) => update({ antecedent: v })}
          disabled={antecedentOptions.length === 1}
          style={{width: '65px'}}
        >
          {antecedentOptions.map(option => (
            <MenuItem key={option.order} value={option.value} primaryText={option.name} />
          ))}
        </SelectField>
        &nbsp;&nbsp;
        <span style={{position: 'relative', top: '4px', fontSize: '28px', fontWeight: '100', color: '#bbb'}}>/</span>
        &nbsp;&nbsp;
        <SelectField
          className={s.ratioUnit}
          value={ratio.consequent}
          onChange={(e, i, v) => update({ consequent: v })}
          disabled={consequentOptions.length === 1}
          style={{width: '65px'}}
        >
          {consequentOptions.map(option => (
            <MenuItem key={option.order} value={option.value} primaryText={option.name} />
          ))}
        </SelectField>
      </div>
    );
  }
}

export default withStyles(s)(Ratio);
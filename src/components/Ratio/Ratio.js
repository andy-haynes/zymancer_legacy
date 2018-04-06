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
    const _update = (changed) => update(Object.assign({}, ratio, changed));
    return (
      <div className={s.ratio}>
        <TextField
          id="ratio-input"
          value={helpers.displayMeasurementValue(ratio.value)}
          onChange={(e) => _update({ value: e.target.value })}
          style={{width: '5em', position: 'relative', bottom: '1em'}}
        />
        <SelectField
          className={s.ratioUnit}
          value={ratio.antecedent}
          onChange={(e, i, v) => _update({ antecedent: v })}
          disabled={antecedentOptions.length === 1}
          style={{width: '5em', marginTop: '0.2em'}}
        >
          {antecedentOptions.map(option => (
            <MenuItem key={option.order} value={option.value} primaryText={option.name} />
          ))}
        </SelectField>
        &nbsp;&nbsp;
        <span style={{position: 'relative', top: '0.2em', fontSize: '2em', fontWeight: '100', color: '#bbb'}}>/</span>
        &nbsp;&nbsp;
        <SelectField
          className={s.ratioUnit}
          value={ratio.consequent}
          onChange={(e, i, v) => _update({ consequent: v })}
          disabled={consequentOptions.length === 1}
          style={{width: '5em'}}
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

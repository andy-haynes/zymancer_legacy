import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainSearchOption.css';
import { calculateGrainRGB } from '../../utils/BrewMath';
import { Pound, Gallon } from '../../constants/Units';

const GrainSearchOption = ({ grain, addGrain }) => (
  <div className={s.grainSearchOption} onClick={addGrain}>
    <div className="pure-g">
      <div className="pure-u-15-24">
        <div className={s.grainDetail}>
          {grain.name}
          <div className={s.grainSubtext}>
            {grain.flavor || grain.characteristics}
          </div>
        </div>
      </div>
      <div className="pure-u-6-24">
        <div className={s.grainDetail}>
          {grain.mfg}
        </div>
      </div>
      <div
        className="pure-u-3-24"
        style={{ backgroundColor: calculateGrainRGB({ value: 1, unit: Gallon }, Object.assign({}, grain, { weight: { value: 1, unit: Pound } })) }}
      />
    </div>
  </div>
);

GrainSearchOption.propTypes = {
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  addGrain: PropTypes.func.isRequired
};

export default withStyles(s)(GrainSearchOption);
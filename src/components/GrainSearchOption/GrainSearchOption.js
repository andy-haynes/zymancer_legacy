import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainSearchOption.css';

const GrainSearchOption = ({ name, gravity, lovibond, color, addGrain }) => (
  <div className={s.grainSearchOption} onClick={addGrain}>
    <div className="pure-g">
      <div className="pure-u-12-24">
        <div className={s.grainDetail}>
          {name}
        </div>
      </div>
      <div className="pure-u-4-24">
        <div className={s.grainDetail}>
          {gravity}
        </div>
      </div>
      <div className="pure-u-4-24">
        <div className={s.grainDetail}>
          {parseFloat(lovibond)}
        </div>
      </div>
      <div className="pure-u-4-24"  style={{ backgroundColor: color }} />
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
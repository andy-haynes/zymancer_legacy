import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './YeastSearchOption.css';

const YeastSearchOption = ({ yeast, addYeast }) => (
  <div className={s.yeastSearchOption} onClick={() => addYeast(yeast)}>
    <div className="pure-g">
      <div className="pure-u-12-24">
        <div className={s.yeastDetail}>
          {yeast.name}
        </div>
        <div className={s.subtext}>
          {yeast.mfg} {yeast.code}
        </div>
      </div>
      <div className="pure-u-6-24">
        <div className={s.yeastDetail}>
          {yeast.tolerance}
        </div>
      </div>
      <div className="pure-u-6-24">
        <div className={s.yeastDetail}>
          {yeast.attenuationRange.toString()}%
        </div>
      </div>
    </div>
  </div>
);
/*
YeastSearchOption.propTypes = {
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  addGrain: PropTypes.func.isRequired
};
*/
export default withStyles(s)(YeastSearchOption);
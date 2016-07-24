import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './YeastSearchOption.css';

const YeastSearchOption = ({ yeast, addYeast }) => (
  <div className={s.yeastSearchOption} onClick={addYeast}>
    <div className="pure-g">
      <div className="pure-u-9-24">
        <div className={s.yeastDetail}>
          {yeast.code} &ndash; {yeast.name}
        </div>
      </div>
      <div className="pure-u-4-24">
        <div className={s.yeastDetail}>
          {yeast.mfg}
        </div>
      </div>
      <div className="pure-u-3-24">
        <div className={s.yeastDetail}>
          {yeast.tolerance}
        </div>
      </div>
      <div className="pure-u-4-24">
        <div className={s.yeastDetail}>
          {yeast.attenuation}
        </div>
      </div>
      <div className="pure-u-4-24">
        <div className={s.yeastDetail}>
          {yeast.rangeF}
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
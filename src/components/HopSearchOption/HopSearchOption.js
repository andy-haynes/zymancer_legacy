import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopSearchOption.css';

const HopSearchOption = ({ name, categoryDetails, alphaRange, betaRange, addHop }) => (
  <div className={s.hopSearchOption} onClick={addHop}>
    <div className="pure-g">
      <div className="pure-u-12-24">
        <div className={s.hopDetail}>
          {name}
          <div className={s.hopCategories}>
            {categoryDetails}
          </div>
        </div>
      </div>
      <div className="pure-u-6-24">
        <div className={s.hopDetail}>
          {alphaRange.low}
          {alphaRange.high ? (` - ${alphaRange.high}`) : ''}
        </div>
      </div>
      <div className="pure-u-6-24">
        <div className={s.hopDetail}>
          {betaRange.low}
          {betaRange.high ? (` - ${betaRange.high}`) : ''}
        </div>
      </div>
    </div>
  </div>
);
/*
HopSearchOption.propTypes = {
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  addGrain: PropTypes.func.isRequired
};
*/
export default withStyles(s)(HopSearchOption);
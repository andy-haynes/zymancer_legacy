import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hop.css';
import helpers from '../../../utils/helpers';

const Hop = ({ hop, actions }) => (
  <div className={s.hop}>
    <div className={s.hopDetail}>
      {helpers.mobile.formatIngredientName(hop.name)}
      <div className={s.categories}>
        {hop.categories.join(', ')}
      </div>
      <div className={s.alpha}>
        {hop.alphaRange.low}
        {hop.alphaRange.high ? (` - ${hop.alphaRange.high}`) : ''}
      </div>
    </div>
  </div>
);
/*
Hop.propTypes = {
};
*/
export default withStyles(s)(Hop);
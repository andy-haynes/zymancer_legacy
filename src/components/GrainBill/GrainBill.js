import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grain from '../Grain';
import s from './GrainBill.css';

const GrainBill = ({ grains, targetVolume, actions }) => (
  <div className={s.grainBill}>
    {grains.map(grain => (
      <Grain
        key={grain.id}
        grain={grain}
        targetVolume={targetVolume}
        actions={actions}
      />
    ))}
  </div>
);
/*
GrainBill.propTypes = {
  grains: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    name:       PropTypes.string.isRequired,
    gravity:    PropTypes.number.isRequired,
    color:      PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick:  PropTypes.func.isRequired
};
*/
export default withStyles(s)(GrainBill);
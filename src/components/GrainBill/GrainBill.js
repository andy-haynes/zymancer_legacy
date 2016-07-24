import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grain from '../Grain';
import s from './GrainBill.css';

const GrainBill = ({ grains, targetVolume, removeGrain, setWeight, setGravity, setLovibond }) => (
  <div className={s.grainBill}>
    {grains.map(grain => (
      <Grain
        key={grain.id}
        grain={grain}
        targetVolume={targetVolume}
        removeGrain={() => removeGrain(grain)}
        setWeight={(weight) => setWeight(grain, weight)}
        setGravity={(gravity) => setGravity(grain, gravity)}
        setLovibond={(lovibond) => setLovibond(grain, lovibond)}
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
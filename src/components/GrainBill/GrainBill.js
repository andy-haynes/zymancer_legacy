import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grain from '../Grain';
import s from './GrainBill.css';

const GrainBill = ({ grains, targetVolume, removeGrain, setWeight, setGravity, setLovibond }) => (
  <div className={s.grainBill}>
    <div className={s.grainHeaders}>
      <div className="pure-g">
        <div className="pure-u-2-24">
        </div>
        <div className="pure-u-8-24">
          Name
        </div>
        <div className="pure-u-4-24">
          &deg;L
        </div>
        <div className="pure-u-4-24">
          SG
        </div>
        <div className="pure-u-5-24">
          Weight
        </div>
        <div className="pure-u-1-24">
        </div>
      </div>
    </div>
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
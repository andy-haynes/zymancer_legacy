import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Hop from '../Hop';
import s from './HopSchedule.css';

const HopSchedule = ({ hops, originalGravity, boilVolume, actions }) => (
  <div className={s.hopSchedule}>
    {hops.map(hop => (
      <Hop
        key={hop.id}
        hop={hop}
        originalGravity={originalGravity}
        boilVolume={boilVolume}
        actions={actions}
      />
    ))}
  </div>
);

/*
HopSchedule.propTypes = {
  grains: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    name:       PropTypes.string.isRequired,
    gravity:    PropTypes.number.isRequired,
    color:      PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick:  PropTypes.func.isRequired
};
*/

export default withStyles(s)(HopSchedule, s);
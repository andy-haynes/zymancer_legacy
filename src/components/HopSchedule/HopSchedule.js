import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Hop from '../Hop';
import s from './HopSchedule.css';
import HopChart from '../../containers/HopChart';
import HopSearchContainer from '../../containers/HopSearch';

const HopSchedule = ({ hops, originalGravity, boilVolume, boilMinutes, actions }) => (
  <div className={s.hopSchedule}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <div className={s.hops}>
          {hops.map(hop => (
            <Hop
              key={hop.id}
              hop={hop}
              originalGravity={originalGravity}
              boilVolume={boilVolume}
              boilMinutes={boilMinutes}
              actions={actions}
            />
          ))}
        </div>
      </div>
      <div className="pure-u-1-2">
        <HopSearchContainer />
        <div className={s.hopChart}>
          {hops.length ? <HopChart /> : ''}
        </div>
      </div>
    </div>
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
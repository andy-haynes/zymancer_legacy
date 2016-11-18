import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grain from '../Grain';
import s from './GrainBill.css';
import GrainSearchContainer from '../../containers/GrainSearch';
import GrainChart from '../../containers/GrainChart';

const GrainBill = ({ grains, targetVolume, actions }) => (
  <div className={s.grainBill}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <div className={s.grains}>
          {grains.map(grain => (
            <Grain
              key={grain.id}
              grain={grain}
              targetVolume={targetVolume}
              actions={actions}
            />
          ))}
        </div>
      </div>
      <div className="pure-u-1-2">
        <GrainSearchContainer />
        <div className={s.grainChart}>
          <GrainChart />
        </div>
      </div>
    </div>
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
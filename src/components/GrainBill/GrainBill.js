import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grain from '../Grain';
import Ingredient from '../Ingredient';
import s from './GrainBill.css';
import Search from '../../containers/IngredientSearch';
import GrainChart from '../../containers/GrainChart';

const GrainBill = ({ grains, targetVolume, actions }) => (
  <div className={s.grainBill}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <div className={s.grains}>
          {grains.map((grain, i) => (
            <Ingredient key={`${grain.id}-${i}`} ingredient={grain}>
              <Grain
                grain={grain}
                targetVolume={targetVolume}
                actions={actions}
              />
            </Ingredient>
          ))}
        </div>
      </div>
      <div className="pure-u-1-2">
        <Search.GrainSearch />
        <div className={s.grainChart}>
          <GrainChart diameter="350px" />
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
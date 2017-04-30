import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Hop from '../Hop';
import Ingredient from '../Ingredient';
import s from './HopSchedule.css';
import HopChart from '../../containers/HopChart';
import Search from '../../containers/IngredientSearch';

const HopSchedule = ({ hops, originalGravity, boilVolume, boilMinutes, actions }) => (
  <div className={s.hopSchedule}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <div className={s.hops}>
          {hops.map((hop, i) => (
            <Ingredient key={`${hop.id}-${i}`} ingredient={hop}>
              <Hop
                hop={hop}
                originalGravity={originalGravity}
                boilVolume={boilVolume}
                boilMinutes={boilMinutes}
                actions={actions}
              />
            </Ingredient>
          ))}
        </div>
      </div>
      <div className="pure-u-1-2">
        <Search.HopSearch />
        <div className={s.hopChart}>
          {hops.length ? <HopChart diameter="350px" /> : ''}
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
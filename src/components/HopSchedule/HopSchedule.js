import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Hop from '../Hop';
import Ingredient from '../IngredientDetail';
import s from './HopSchedule.css';
import HopChartContainer from '../../containers/HopChart';
import Search from '../../containers/IngredientSearch';

class HopSchedule extends React.PureComponent {
  static propTypes = {
    hops: PropTypes.arrayOf(DefinedTypes.hop).isRequired,
    originalGravity: PropTypes.number.isRequired,
    boilVolume: DefinedTypes.measurement.isRequired,
    boilMinutes: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { hops, originalGravity, boilVolume, boilMinutes, actions } = this.props;
    return (
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
            {hops.length ? <HopChartContainer /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HopSchedule, s);

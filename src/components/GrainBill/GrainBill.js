import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grain from '../Grain';
import Ingredient from '../IngredientDetail';
import s from './GrainBill.css';
import GrainChartContainer from '../../containers/GrainChart';
import Search from '../../containers/IngredientSearch';

class GrainBill extends React.PureComponent {
  static propTypes = {
    grains: PropTypes.arrayOf(DefinedTypes.grain).isRequired,
    targetVolume: DefinedTypes.measurement.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { grains, targetVolume, actions } = this.props;
    return (
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
            {grains.length ? <GrainChartContainer /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(GrainBill);

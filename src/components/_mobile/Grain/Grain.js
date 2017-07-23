import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Grain.css';
import Measurement from '../Measurement';
import Search from '../../../containers/IngredientSearch';
import GrainChart from '../../../containers/GrainChart';
import MeasurementUnits from '../../../constants/MeasurementUnits';
import helpers from '../../../utils/helpers';
import zymath from '../../../utils/zymath';

class Grain extends React.PureComponent {
  static propTypes = {
    grain: DefinedTypes.grain.isRequired,
    targetVolume: DefinedTypes.measurement.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { grain, targetVolume, actions } = this.props;
    return (
      <div className={s.grain}>
        <div className={s.colorBar} style={{
          backgroundColor: zymath.calculateGrainRGB(targetVolume, grain)
        }}>
        </div>
        <div className={s.grainDetail}>
          {helpers.mobile.formatIngredientName(grain.name)}
          <div className={s.grainMfg}>
            {grain.mfg}
          </div>
          <div className={s.grainGravity}>
            {zymath.formatGravity(grain.gravity)}
          </div>
        </div>
        <div className={s.grainWeight}>
          <Measurement
            measurement={grain.weight}
            update={w => actions.setWeight(grain, w)}
            options={MeasurementUnits.GrainWeightShort}
            />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Grain);

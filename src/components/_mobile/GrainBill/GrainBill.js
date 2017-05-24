import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainBill.css';
import Grain from '../Grain';
import IngredientTab from '../IngredientTab';
import Search from '../../../containers/IngredientSearch';
import GrainChart from '../../../containers/GrainChart';

class GrainBill extends React.PureComponent {
  static propTypes = {
    grains: PropTypes.arrayOf(DefinedTypes.grain).isRequired,
    targetVolume: DefinedTypes.measurement.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { grains, targetVolume, actions } = this.props;
    return (
      <IngredientTab
        chart={<GrainChart diameter='140px' />}
        ingredients={grains.map(grain => (
          <Grain {...{ grain, targetVolume, actions, ingredient: grain }} />
        ))}
        search={Search.MobileGrainSearch}
        removeIngredient={actions.removeGrain}
      />
    );
  }
}

export default withStyles(s)(GrainBill);
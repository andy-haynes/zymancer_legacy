import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopSchedule.css';
import Hop from '../Hop';
import IngredientTab from '../IngredientTab';
import Search from '../../../containers/IngredientSearch';
import HopChart from '../../../containers/HopChart';

class HopSchedule extends React.PureComponent {
  static propTypes = {
    hops: PropTypes.arrayOf(DefinedTypes.hop).isRequired,
    boilMinutes: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { hops, boilMinutes, actions } = this.props;
    return (
      <IngredientTab
        chart={hops.length ? <HopChart diameter='140px' /> : ''}
        ingredients={hops.map(hop => (
          <Hop {...{ hop, boilMinutes, actions, ingredient: hop }} />
        ))}
        search={Search.MobileHopSearch}
        removeIngredient={actions.removeHop}
      />
    );
  }
}

export default withStyles(s)(HopSchedule);
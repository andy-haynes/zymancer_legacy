import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopSchedule.css';
import Hop from '../Hop';
import IngredientPage from '../IngredientPage';
import Search from '../../../containers/IngredientSearch';
import HopChart from '../../../containers/HopChart';

const HopSchedule = ({ hops, boilMinutes, actions }) => (
  <IngredientPage
    chart={hops.length ? <HopChart diameter='190px' /> : ''}
    ingredients={hops.map(hop => (
      <Hop {...{ hop, boilMinutes, actions, ingredient: hop }} />
    ))}
    search={Search.MobileHopSearch}
    removeIngredient={actions.removeHop}
  />
);
/*
HopSchedule.propTypes = {
};
*/
export default withStyles(s)(HopSchedule);
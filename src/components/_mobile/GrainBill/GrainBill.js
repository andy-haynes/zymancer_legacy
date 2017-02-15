import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainBill.css';
import Grain from '../Grain';
import IngredientPage from '../IngredientPage';
import Search from '../../../containers/IngredientSearch';
import GrainChart from '../../../containers/GrainChart';

const GrainBill = ({ grains, targetVolume, actions }) => (
  <IngredientPage
    chart={<GrainChart diameter='190px' />}
    ingredients={grains.map(grain => (
      <Grain {...{ grain, targetVolume, actions, ingredient: grain }} />
    ))}
    removeIngredient={actions.removeGrain}
    search={Search.MobileGrainSearch}
  />
);
/*
GrainBill.propTypes = {
};
*/
export default withStyles(s)(GrainBill);
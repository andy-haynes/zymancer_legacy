import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainBill.css';
import Grain from '../Grain';
import IngredientTab from '../IngredientTab';
import Search from '../../../containers/IngredientSearch';
import GrainChart from '../../../containers/GrainChart';

const GrainBill = ({ grains, targetVolume, actions }) => (
  <IngredientTab
    chart={<GrainChart diameter='140px' />}
    ingredients={grains.map(grain => (
      <Grain {...{ grain, targetVolume, actions, ingredient: grain }} />
    ))}
    search={Search.MobileGrainSearch}
    removeIngredient={actions.removeGrain}
  />
);
/*
GrainBill.propTypes = {
};
*/
export default withStyles(s)(GrainBill);
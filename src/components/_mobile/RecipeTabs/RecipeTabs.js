import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import { MobileGrainContainer } from '../../../containers/GrainBill';
//import { MobileHopContainer } from '../../../containers/HopSchedule';
//import { MobileMashContainer } from '../../../containers/MashSchedule';
//import { MobileFermentationContainer } from '../../../containers/Fermentation';
//import { MobileStyleContainer } from '../../../containers/Style';
import { BrewMethod, RecipeTab } from '../../../constants/AppConstants';

const RecipeTabs = ({ recipe }) => (
  <div className={s.mobileRecipeTabs}>
    {recipe.selectedTab === RecipeTab.Grains && <MobileGrainContainer />}
    {recipe.selectedTab === RecipeTab.Hops && <MobileGrainContainer />}
    {recipe.selectedTab === RecipeTab.Mash && <MobileGrainContainer />}
    {recipe.selectedTab === RecipeTab.Fermentation && <MobileGrainContainer />}
    {recipe.selectedTab === RecipeTab.Style && <MobileGrainContainer />}
  </div>
);

export default withStyles(s)(RecipeTabs);
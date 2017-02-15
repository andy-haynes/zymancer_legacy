import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import { MobileRecipeContainer } from '../../../containers/Recipe';
import { MobileGrainContainer } from '../../../containers/GrainBill';
//import { MobileHopContainer } from '../../../containers/HopSchedule';
//import { MobileMashContainer } from '../../../containers/MashSchedule';
//import { MobileFermentationContainer } from '../../../containers/Fermentation';
//import { MobileStyleContainer } from '../../../containers/Style';
import { BrewMethod, MobileRecipeTab } from '../../../constants/AppConstants';

const RecipeTabs = ({ recipe }) => (
  <div className={s.mobileRecipeTabs}>
    {recipe.selectedTab === MobileRecipeTab.Root && <MobileRecipeContainer />}
    {recipe.selectedTab === MobileRecipeTab.Grains && <MobileGrainContainer />}
    {recipe.selectedTab === MobileRecipeTab.Hops && <MobileGrainContainer />}
    {recipe.selectedTab === MobileRecipeTab.Mash && <MobileGrainContainer />}
    {recipe.selectedTab === MobileRecipeTab.Fermentation && <MobileGrainContainer />}
    {recipe.selectedTab === MobileRecipeTab.Style && <MobileGrainContainer />}
  </div>
);

export default withStyles(s)(RecipeTabs);
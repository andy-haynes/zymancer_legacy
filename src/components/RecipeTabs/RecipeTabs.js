import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import MobileTabsContainer from '../../containers/MobileTabs';
import GrainBillContainer from '../../containers/GrainBill';
import HopScheduleContainer from '../../containers/HopSchedule';
import MashScheduleContainer from '../../containers/MashSchedule';
import FermentationContainer from '../../containers/Fermentation';
import StyleContainer from '../../containers/Style';
import RecipeHeader from '../RecipeHeader';
import { BrewMethod } from '../../constants/AppConstants';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

class RecipeTabs extends React.Component {
  static propTypes = {
    recipe: DefinedTypes.recipe.isRequired,
    authenticated: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired
  };

  render() {
    const { recipe, authenticated, actions, isMobile } = this.props;
    return (
      <div className={s.recipeTabs}>
        {!isMobile && <RecipeHeader {...{ recipe, authenticated, actions }} />}
        {!isMobile && <Tabs>
          <Tab className={s.recipeTab} label="Grains">
            <GrainBillContainer />
          </Tab>
          <Tab className={s.recipeTab} label="Hops">
            <HopScheduleContainer />
          </Tab>
          <Tab className={s.recipeTab} label="Mash" disabled={recipe.method === BrewMethod.BIAB}>
            <MashScheduleContainer />
          </Tab>
          <Tab className={s.recipeTab} label="Fermentation">
            <FermentationContainer />
          </Tab>
          <Tab className={s.recipeTab} label="Style">
            <StyleContainer />
          </Tab>
        </Tabs>}
        {isMobile && <MobileTabsContainer />}
      </div>
    );
  }
}

export default withStyles(s)(RecipeTabs);
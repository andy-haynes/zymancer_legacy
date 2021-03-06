import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import { MobileRecipeContainer, MobileRecipeHeader } from '../../../containers/Recipe';
import { MobileGrainContainer } from '../../../containers/GrainBill';
import { MobileHopContainer } from '../../../containers/HopSchedule';
import { MobileMashContainer } from '../../../containers/MashSchedule';
import { MobileFermentationContainer } from '../../../containers/Fermentation';
import { MobileStyleContainer } from '../../../containers/Style';
import { BrewMethod, MobileRecipeTab } from '../../../constants/AppConstants';
import { Tabs, Tab } from 'material-ui/Tabs';
import RecipeIcon from 'material-ui/svg-icons/av/featured-play-list';
import GrainIcon from 'material-ui/svg-icons/action/donut-large';
import HopIcon from 'material-ui/svg-icons/places/spa';
import MashIcon from 'material-ui/svg-icons/image/timelapse';
import FermentationIcon from 'material-ui/svg-icons/action/bug-report';
import StyleIcon from 'material-ui/svg-icons/image/style';

class RecipeTabs extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { activeTab, actions } = this.props;
    return (
      <div className={s.recipeTabs}>
        <div className={s.tabs}>
          <Tabs
            onChange={(tab) => actions.setMobileTab()}
            value={activeTab}
          >
            <Tab icon={<RecipeIcon />} value={MobileRecipeTab.Root}>
              <MobileRecipeContainer />
            </Tab>
            <Tab icon={<GrainIcon />} value={MobileRecipeTab.Grains}>
              <MobileGrainContainer />
            </Tab>
            <Tab icon={<HopIcon />} value={MobileRecipeTab.Hops}>
              <MobileHopContainer />
            </Tab>
            <Tab icon={<MashIcon />} value={MobileRecipeTab.Mash}>
              <MobileMashContainer />
            </Tab>
            <Tab icon={<FermentationIcon />} value={MobileRecipeTab.Fermentation}>
              <MobileFermentationContainer />
            </Tab>
            <Tab icon={<StyleIcon />} value={MobileRecipeTab.Style}>
              <MobileStyleContainer />
            </Tab>
          </Tabs>
        </div>
        <MobileRecipeHeader />
      </div>
    );
  }
}

export default withStyles(s)(RecipeTabs);
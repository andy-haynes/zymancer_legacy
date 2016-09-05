import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import GrainBillContainer from '../../containers/GrainBillContainer';
import GrainSearchContainer from '../../containers/GrainSearchContainer';
import GrainChart from '../../containers/GrainChart';
import HopScheduleContainer from '../../containers/HopScheduleContainer';
import HopChart from '../../containers/HopChart';
import HopSearchContainer from '../../containers/HopSearchContainer';
import MashScheduleContainer from '../../containers/MashScheduleContainer';
import FermentationContainer from '../../containers/FermentationContainer';
import YeastSearchContainer from '../../containers/YeastSearchContainer';
import { RecipeVolume } from '../../constants/MeasurementUnits';
import RecipeHeader from '../RecipeHeader';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

const RecipeTabs = ({ recipe, setRecipeName, setTargetVolume, setBoilVolume, setBoilTime, setEfficiency, exportRecipe }) => (
  <div className={s.recipeTabs}>
    <RecipeHeader
      recipe={recipe}
      setRecipeName={setRecipeName}
      setTargetVolume={setTargetVolume}
      setBoilVolume={setBoilVolume}
      setBoilTime={setBoilTime}
      setEfficiency={setEfficiency}
      exportRecipe={exportRecipe}
    />
    <Tabs>
      <Tab className={s.recipeTab} label="Grains">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <GrainBillContainer />
          </div>
          <div className="pure-u-1-2">
            <GrainSearchContainer />
            <div className={s.grainChart}>
              <GrainChart />
            </div>
          </div>
        </div>
      </Tab>
      <Tab className={s.recipeTab} label="Hops">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <HopScheduleContainer />
          </div>
          <div className="pure-u-1-2">
            <HopSearchContainer />
            <div className={s.hopChart}>
              {recipe.hops.length ? <HopChart /> : ''}
            </div>
          </div>
        </div>
      </Tab>
      <Tab className={s.recipeTab} label="Mash">
        <MashScheduleContainer />
      </Tab>
      <Tab className={s.recipeTab} label="Fermentation">
        <FermentationContainer />
      </Tab>
    </Tabs>
  </div>
);

export default withStyles(s)(RecipeTabs);
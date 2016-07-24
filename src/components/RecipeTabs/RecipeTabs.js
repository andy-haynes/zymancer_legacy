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
import Measurement from '../Measurement';
import { roundTo } from '../../utils/core';
import Tabs from 'material-ui/tabs/tabs';
import Tab from 'material-ui/tabs/tab';
import SliderInput from '../SliderInput';
import TextField from 'material-ui/TextField';

const RecipeTabs = ({ recipeName, originalGravity, finalGravity, targetVolume, boilVolume, boilMinutes, efficiency, hops, IBU, ABV, setRecipeName, setTargetVolume, setBoilVolume, setBoilTime, setEfficiency }) => (
  <div className={s.recipeTabs}>
    <div className={s.recipeHeader}>
      <div className="pure-g">
        <div className="pure-u-6-24">
          Recipe Name
        </div>
        <div className="pure-u-2-24">
          OG
        </div>
        <div className="pure-u-2-24">
          FG
        </div>
        <div className="pure-u-1-24">
          IBU
        </div>
        <div className="pure-u-1-24">
          ABV
        </div>
        <div className="pure-u-3-24">
          Target Volume
        </div>
        <div className="pure-u-3-24">
          Boil Volume
        </div>
        <div className="pure-u-2-24">
          Boil Time
        </div>
        <div className="pure-u-4-24">
          Efficiency
        </div>
      </div>
    </div>
    <div className="pure-g">
      <div className="pure-u-6-24">
        <TextField id="recipe-name" value={recipeName} onChange={e => setRecipeName(e.target.value)} />
      </div>
      <div className="pure-u-2-24">
        <div className={s.calculatedValue}>
          {originalGravity}
        </div>
      </div>
      <div className="pure-u-2-24">
        <div className={s.calculatedValue}>
          {finalGravity}
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.calculatedValue}>
          {roundTo(IBU, 1)}
        </div>
      </div>
      <div className="pure-u-1-24">
        <div className={s.calculatedValue}>
          {ABV}%
        </div>
      </div>
      <div className="pure-u-3-24">
        <Measurement measurement={targetVolume} update={setTargetVolume} options={RecipeVolume} />
      </div>
      <div className="pure-u-3-24">
        <Measurement measurement={boilVolume} update={setBoilVolume} options={RecipeVolume} />
      </div>
      <div className="pure-u-2-24">
        <TextField
          id="boil-minutes"
          className={s.recipeInput}
          value={boilMinutes}
          onChange={e => setBoilTime(e.target.value)}
          style={{width: "40px"}}
        />
      </div>
      <div className="pure-u-4-24">
        <SliderInput value={efficiency} min={25} max={95} update={setEfficiency} />
      </div>
    </div>
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
              {hops.length ? <HopChart /> : ''}
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
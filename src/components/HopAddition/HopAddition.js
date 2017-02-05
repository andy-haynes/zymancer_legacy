import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopAddition.css';
import Measurement from '../Measurement';
import round from 'lodash/round';
import MeasurementUnits from '../../constants/MeasurementUnits';
import { HopAdditionType } from '../../constants/AppConstants';
import zymath from '../../utils/zymath';
import SliderInput from '../SliderInput';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';

const HopAddition = ({ addition, hop, originalGravity, boilVolume, boilMinutes, actions }) => (
  <div className={s.hopAddition}>
    <div className="pure-g">
      <div className="pure-u-5-24">
        <div className={s.additionWeight}>
          <Measurement
            measurement={addition.weight}
            update={(weight) => actions.setAdditionWeight(addition, hop, weight)}
            options={MeasurementUnits.HopAdditionWeight}
          />
        </div>
      </div>
      <div className="pure-u-7-24">
        <SliderInput
          value={addition.minutes}
          min={0}
          max={boilMinutes}
          update={(minutes) => actions.setAdditionTime(addition, hop, minutes)}
          disabled={addition.type !== HopAdditionType.Boil}
        />
      </div>
      <div className="pure-u-6-24">
        <div className={s.additionType}>
          <SelectField
            value={addition.type}
            onChange={(e, i, v) => actions.setAdditionType(addition, hop, v)}
            style={{width: '7.5em'}}
          >
            <MenuItem primaryText='First Wort' value={HopAdditionType.FirstWort} />
            <MenuItem primaryText='Hop Back' value={HopAdditionType.HopBack} />
            <MenuItem primaryText='Boil' value={HopAdditionType.Boil} />
            <MenuItem primaryText='Whirlpool' value={HopAdditionType.Whirlpool} />
            <MenuItem primaryText='Dry Hop' value={HopAdditionType.Dry} />
          </SelectField>
        </div>
      </div>
      <div className="pure-u-5-24">
        <div className={s.additionDetail}>
          {round(zymath.calculateIBU(addition, hop.alpha, originalGravity, boilVolume), 1)}
        </div>
        <div className={s.additionDetail}>
          {round(zymath.calculateUtilization(addition, originalGravity), 2)}
        </div>
      </div>
      <div className="pure-u-1-24">
        <ContentRemoveCircleOutline
          className={s.removeAddition}
          onClick={() => actions.removeAddition(addition, hop)}
        />
      </div>
    </div>
  </div>
);

export default withStyles(s)(HopAddition);
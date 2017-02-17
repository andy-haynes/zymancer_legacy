import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hop.css';
import helpers from '../../../utils/helpers';
import SliderInput from '../SliderInput';
import Measurement from '../Measurement';
import { HopAdditionType } from '../../../constants/AppConstants';
import MeasurementUnits from '../../../constants/MeasurementUnits';
import { List, ListItem } from 'material-ui/List';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

const Hop = ({ hop, boilMinutes, actions }) => (
  <div className={s.hop}>
    <div className={s.hopDetail}>
      <span className={s.hopName}>
        {helpers.mobile.formatIngredientName(hop.name)}
      </span>
      <IconButton
        onTouchTap={() => actions.addAddition(hop, boilMinutes)}
        style={{
          display: 'inline-block'
        }}
      >
        <ContentAddCircle />
      </IconButton>
      <div className={s.categories}>
        {hop.categories.join(', ')}
      </div>
      <div className={s.alpha}>
        {hop.alphaRange.low}
        {hop.alphaRange.high ? (` - ${hop.alphaRange.high}`) : ''}
      </div>
    </div>
    <div className={s.hopAdditions}>
      <List>
        {hop.additions.map((addition, i) => (
          <ListItem key={i} innerDivStyle={{marginBottom: '-10%'}}>
            {(addition.type === HopAdditionType.Boil &&
              <SliderInput
                value={addition.minutes}
                min={0}
                max={boilMinutes}
                update={m => actions.setAdditionTime(addition, hop, m)}
              />
            )}
            <div style={{marginTop: '-15%'}}>
              <div style={{float: 'left', display: 'inline-block'}}>
                <Measurement
                  measurement={addition.weight}
                  update={w => actions.setWeight(addition, w)}
                  options={MeasurementUnits.HopWeightShort}
                />
              </div>
              <SelectField
                value={addition.type}
                onChange={(e, i, v) => actions.setAdditionType(addition, hop, v)}
                style={{width: '7.5em', float: 'right'}}
              >
                <MenuItem primaryText='First Wort' value={HopAdditionType.FirstWort} />
                <MenuItem primaryText='Hop Back' value={HopAdditionType.HopBack} />
                <MenuItem primaryText='Boil' value={HopAdditionType.Boil} />
                <MenuItem primaryText='Whirlpool' value={HopAdditionType.Whirlpool} />
                <MenuItem primaryText='Dry Hop' value={HopAdditionType.Dry} />
              </SelectField>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  </div>
);
/*
Hop.propTypes = {
};
*/
export default withStyles(s)(Hop);
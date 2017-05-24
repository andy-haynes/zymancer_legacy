import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
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

class Hop extends React.PureComponent {
  static propTypes = {
    hop: DefinedTypes.hop.isRequired,
    boilMinutes: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { hop, boilMinutes, actions } = this.props;
    return (
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
                <div style={{marginTop: '5%'}}>
                  <div style={{display: 'inline-block', marginRight: '18%'}}>
                    <Measurement
                      measurement={addition.weight}
                      update={w => actions.setAdditionWeight(addition, hop, w)}
                      options={MeasurementUnits.HopWeightShort}
                    />
                  </div>
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
                {(addition.type === HopAdditionType.Boil &&
                  <div style={{marginBottom: '-2em', marginTop: '-1em'}}>
                    <SliderInput
                      value={addition.minutes}
                      min={0}
                      max={boilMinutes}
                      update={m => actions.setAdditionTime(addition, hop, m)}
                    />
                  </div>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Hop);
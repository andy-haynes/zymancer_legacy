import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainBill.css';
import Measurement from '../Measurement';
import Search from '../../../containers/IngredientSearch';
import GrainChart from '../../../containers/GrainChart';
import MeasurementUnits from '../../../constants/MeasurementUnits';
import zymath from '../../../utils/zymath';
import { List, ListItem } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import { grey500 } from 'material-ui/styles/colors';

class GrainBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOpen: false
    }
  }

  openSearch = () => {
    this.setState({
      searchOpen: true
    });
  };

  closeSearch = () => {
    this.setState({
      searchOpen: false
    });
  };

  render() {
    const { grains, targetVolume, actions } = this.props;
    const _bgColor = (g) => zymath.calculateGrainRGB(targetVolume, g);
    function _formatName(g) {
      const maxLen = 18;
      if (g.name.length <= maxLen) {
        return g.name;
      }

      const components = g.name.split(' ');
      if (components[0].length > maxLen) {
        return `${components[0].substring(0, maxLen)}...`;
      }

      let i = 0;
      let name = '';
      do {
        name += components[i++] + ' ';
      } while (name.length < maxLen);
      return `${name.trim()}...`;
    }

    return (
      <div className={s.grainBill}>
        <Drawer open={this.state.searchOpen} width={270}>
          <IconButton onTouchTap={this.closeSearch}>
            <CloseIcon />
          </IconButton>
          <Search.MobileGrainSearch dismiss={this.closeSearch} />
        </Drawer>
        <div className={s.chart}>
          <GrainChart diameter="165px"/>
        </div>
        <List className={s.grainList}>
          {grains.map(g => (
            <ListItem
              onTouchTap={() => console.log('herro')}
              innerDivStyle={{padding: '0.8em 0.4em 0.8em 0.1em'}}
              rightIcon={
                <IconButton onTouchTap={() => actions.removeGrain(g)}>
                  <CloseIcon color={grey500}/>
                </IconButton>
              }
            >
              <div style={{minHeight: '3em'}}>
                <div className={s.colorBar} style={{
                  backgroundColor: _bgColor(g)
                }}>
                </div>
                <div className={s.grainDetail}>
                  {_formatName(g)}
                  <div className={s.grainMfg}>
                    {g.mfg}
                  </div>
                  <div className={s.grainGravity}>
                    {zymath.formatGravity(g.gravity)}
                  </div>
                </div>
                <div className={s.grainWeight}>
                  <Measurement
                    measurement={g.weight}
                    update={w => actions.setWeight(g, w)}
                    options={MeasurementUnits.GrainWeightShort}
                    />
                </div>
              </div>
            </ListItem>
          ))}
        </List>
        {!this.state.searchOpen &&
          <FloatingActionButton
            onTouchTap={this.openSearch}
            className={s.searchIcon}
            mini
          >
            <AddCircleIcon />
          </FloatingActionButton>
        }
      </div>
    );
  }
}
/*
GrainBill.propTypes = {
  grains: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    name:       PropTypes.string.isRequired,
    gravity:    PropTypes.number.isRequired,
    color:      PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick:  PropTypes.func.isRequired
};
*/
export default withStyles(s)(GrainBill);
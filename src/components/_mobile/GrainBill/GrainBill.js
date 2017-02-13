import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainBill.css';
import Measurement from '../../Measurement';
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
import SearchIcon from 'material-ui/svg-icons/action/search';
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

    return (
      <div className={s.grainBill}>
        <Drawer open={this.state.searchOpen} width={350}>
          <IconButton onTouchTap={this.closeSearch} style={{float: 'right', display: 'inline-block'}}>
            <CloseIcon />
          </IconButton>
          <Search.MobileGrainSearch dismiss={this.closeSearch} />
        </Drawer>
        <div style={{position: 'relative', left: '25%', maxWidth: '190px'}}>
          <GrainChart diameter="190px"/>
        </div>
        <List style={{marginTop: '-1em'}}>
          {grains.map(g => (
            <ListItem
              disabled
              style={{
                marginLeft: '-1.1em',
                marginBottom: '-1.2em'
            }}>
              <div className="pure-g">
                <div className="pure-u-1-24">
                  <div style={{
                    display: 'inline-block',
                    margin: '0.1em',
                    width: '0.8em',
                    height: '85%',
                    backgroundColor: zymath.calculateGrainRGB(targetVolume, g)
                  }}>
                  </div>
                </div>
                <div className="pure-u-14-24">
                  <span style={{position: 'relative', top: '1.1em', left: '0.2em'}}>
                    {g.name}
                  </span>
                </div>
                <div className="pure-u-8-24">
                  <div style={{display: 'inline-block', float: 'right'}}>
                    <Measurement
                      measurement={g.weight}
                      update={w => actions.setWeight(g, w)}
                      options={MeasurementUnits.GrainWeight}
                      />
                  </div>
                </div>
                <div className="pure-u-1-24">
                  <IconButton onTouchTap={() => actions.removeGrain(g)}>
                    <CloseIcon color={grey500}/>
                  </IconButton>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
        <FloatingActionButton onTouchTap={this.openSearch} style={{
          position: 'relative',
          bottom: '-0.4em',
          left: '87%'
        }}>
          <SearchIcon />
        </FloatingActionButton>
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
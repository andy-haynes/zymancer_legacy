import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainSearch.css';
import IngredientSearch from '../IngredientSearch';
import zymath from '../../../utils/zymath';
import Units from '../../../constants/Units';
import { List, ListItem } from 'material-ui/List';

class GrainSearch extends React.PureComponent {
  static propTypes = {
    search: DefinedTypes.search.isRequired,
    actions: PropTypes.object.isRequired,
    dismiss: PropTypes.func.isRequired
  };

  render() {
    const { search, actions, dismiss } = this.props;
    return (
      <IngredientSearch
        {...search}
        filter={actions.createFilter(search.cache)}
      >
        <List style={{paddingTop: '0.6em', paddingBottom: '2em'}}>
          {search.results.map(grain => (
            <ListItem
              key={grain.id}
              innerDivStyle={{
                padding: '0',
                height: '3.5em'
              }}
              onTouchTap={() => {
                actions.addIngredient(grain);
                dismiss && dismiss();
              }}
            >
              <div className={s.color}
                style={{
                  backgroundColor: zymath.calculateGrainRGB({
                      value: 1,
                      unit: Units.Gallon
                    }, Object.assign(grain, {
                      weight: { value: 1, unit: Units.Pound }
                    })
                  )
                }}
              />
              <div className={s.grainDetail}>
                <div>
                  {grain.name}
                </div>
                <div className={s.grainSubtext}>
                  {grain.mfg}
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </IngredientSearch>
    );
  }
}

export default withStyles(s)(GrainSearch);
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainSearch.css';
import IngredientSearch from '../IngredientSearch';
import zymath from '../../../utils/zymath';
import Units from '../../../constants/Units';
import { List, ListItem } from 'material-ui/List';

const GrainSearch = ({ search, actions, dismiss }) => (
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

/*
GrainSearch.propTypes = {
};
*/

export default withStyles(s)(GrainSearch);
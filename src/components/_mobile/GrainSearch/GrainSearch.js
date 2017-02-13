import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainSearch.css';
import IngredientSearch from '../IngredientSearch';
import zymath from '../../../utils/zymath';
import Units from '../../../constants/Units';
//import MobileGrainSearchOption from '../MobileGrainSearchOption';
import { List, ListItem } from 'material-ui/List';

const GrainSearch = ({ search, actions, dismiss }) => (
  <IngredientSearch
    {...search}
    filter={actions.createFilter(search.cache)}
  >
    <List className={s.results}>
      {search.results.map(grain => (
        <ListItem
          key={grain.id}
          className={s.mobileGrainSearchOption}
          onTouchTap={() => {
            actions.addIngredient(grain);
            dismiss && dismiss();
          }}
        >
          <div className="pure-g">
            <div className="pure-u-20-24">
              <div className={s.grainDetail}>
                <div
                  style={{
                    float: 'left',
                    width: '0.8em',
                    height: '2em',
                    marginRight: '0.3em',
                    display: 'inline-block',
                    backgroundColor: zymath.calculateGrainRGB({
                        value: 1,
                        unit: Units.Gallon
                      }, Object.assign(grain, {
                        weight: { value: 1, unit: Units.Pound }
                      })
                    )
                  }}
                />
                {grain.name}
              </div>
            </div>
            <div className="pure-u-4-24">
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
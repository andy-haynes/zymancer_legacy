import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopSearch.css';
import IngredientSearch from '../IngredientSearch';
import zymath from '../../../utils/zymath';
import Units from '../../../constants/Units';
import { List, ListItem } from 'material-ui/List';

const HopSearch = ({ search, actions, dismiss }) => (
  <IngredientSearch
    {...search}
    filter={actions.createFilter(search.cache)}
  >
    <List style={{paddingTop: '0.6em', paddingBottom: '2em'}}>
      {search.results.map((hop, i) => (
        <ListItem
          key={i}
          innerDivStyle={{
            padding: '0',
            height: '3.5em'
          }}
          onTouchTap={() => {
            actions.addIngredient(hop);
            dismiss && dismiss();
          }}
        >
          <div className={s.hopDetail}>
            <div>
              {hop.name}
            </div>
            <div className={s.hopSubtext}>
              {(hop.categories || []).join(', ')}
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  </IngredientSearch>
);

/*
HopSearch.propTypes = {
};
*/

export default withStyles(s)(HopSearch);
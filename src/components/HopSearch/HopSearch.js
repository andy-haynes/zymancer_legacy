import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HopSearchOption from '../HopSearchOption';
import s from './HopSearch.css';
import IngredientSearch from '../IngredientSearch';

const HopSearch = ({ search, boilMinutes, actions }) => (
  <IngredientSearch
    {...search}
    filter={actions.searchHops}
    header={(
      <div className="pure-g">
        <div className="pure-u-12-24">
          <span>Name</span>
        </div>
        <div className="pure-u-6-24">
          <span>Alpha</span>
        </div>
        <div className="pure-u-6-24">
          <span>Beta</span>
        </div>
      </div>
    )}
  >
    {search.results.map(hop => (
      <HopSearchOption
        key={hop.id}
        addHop={() => actions.addHop(Object.assign({}, hop), boilMinutes)}
        hop={hop}
      />
    ))}
  </IngredientSearch>
);
/*
HopSearch.propTypes = {
};
*/
export default withStyles(s)(HopSearch);
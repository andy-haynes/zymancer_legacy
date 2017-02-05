import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GrainSearchOption from '../GrainSearchOption';
import s from './GrainSearch.css';
import IngredientSearch from '../IngredientSearch';

const GrainSearch = ({ search, actions }) => (
  <IngredientSearch
    {...search}
    filter={actions.createFilter(search.cache)}
    header={(
      <div className="pure-g">
        <div className="pure-u-15-24">
          Name
        </div>
        <div className="pure-u-6-24">
          Maltster
        </div>
        <div className="pure-u-3-24">
          Color
        </div>
      </div>
    )}
  >
    {search.results.map(grain => (
      <GrainSearchOption
        key={grain.id}
        addGrain={() => actions.addIngredient(grain)}
        grain={grain}
      />
    ))}
  </IngredientSearch>
);

/*
GrainSearch.propTypes = {
};
*/

export default withStyles(s)(GrainSearch);
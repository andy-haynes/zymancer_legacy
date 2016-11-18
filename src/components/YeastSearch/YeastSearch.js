import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import YeastSearchOption from '../YeastSearchOption';
import s from './YeastSearch.css';
import IngredientSearch from '../IngredientSearch';

const YeastSearch = ({ search, actions }) => (
  <IngredientSearch
    {...search}
    filter={actions.searchYeast}
    header={(
      <div className="pure-g">
        <div className="pure-u-12-24">
          <span>Name</span>
        </div>
        <div className="pure-u-6-24">
          <span>ABV</span>
        </div>
        <div className="pure-u-6-24">
          <span>Attenuation</span>
        </div>
      </div>
    )}
  >
    {search.results.map(yeast => (
      <YeastSearchOption
        key={yeast.id}
        addYeast={actions.addYeast}
        yeast={yeast}
      />
    ))}
  </IngredientSearch>
);
/*
YeastSearch.propTypes = {
};
*/
export default withStyles(s)(YeastSearch);
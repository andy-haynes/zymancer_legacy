import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import YeastSearchOption from '../YeastSearchOption';
import s from './IngredientSearch.css';
import TextField from 'material-ui/TextField';

const IngredientSearch = ({ query, loading, error, children, header, filter }) => (
  <div className={s.ingredientSearch}>
    <TextField
      id="ingredient-search"
      className={s.searchInput}
      inputStyle={{padding: '0 0.7em', lineHeight: '2.4em', fontSize: '1.1em', textAlign: 'center'}}
      placeholder="Start typing to search ingredients"
      value={query}
      onChange={e => filter(e.target.value)}
      style={{width: '90%'}}
    />
    <div className={s.searchResults}>
      {!children.length ? '' : (
        <div className={s.resultsHeader}>
          {header}
        </div>
      )}
      {children}
    </div>
  </div>
);
/*
IngredientSearch.propTypes = {
};
*/
export default withStyles(s)(IngredientSearch);
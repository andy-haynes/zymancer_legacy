import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IngredientSearch.css';
import TextField from 'material-ui/TextField';

const IngredientSearch = ({ query, cache, loading, error, children, header, filter }) => (
  <div className={s.ingredientSearch}>
    <TextField
      id="ingredient-search"
      className={s.searchInput}
      inputStyle={{padding: '0 0.7em', lineHeight: '2.4em', fontSize: '1.1em'}}
      value={query}
      onChange={e => filter(e.target.value, cache)}
      style={{
        width: '75%',
        marginLeft: '15%'
      }}
      autoFocus
    />
    <div className={s.searchResults}>
      {children}
    </div>
  </div>
);
/*
IngredientSearch.propTypes = {
};
*/
export default withStyles(s)(IngredientSearch);
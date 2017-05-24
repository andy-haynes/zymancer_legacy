import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IngredientSearch.css';
import TextField from 'material-ui/TextField';

class IngredientSearch extends React.PureComponent {
  static propTypes = {
    query: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.element),
    header: PropTypes.node.isRequired,
    filter: PropTypes.func.isRequired
  };

  render() {
    const { query, cache, loading, error, children, header, filter } = this.props;
    return (
      <div className={s.ingredientSearch}>
        <TextField
          id="ingredient-search"
          className={s.searchInput}
          inputStyle={{padding: '0 0.7em', lineHeight: '2.4em', fontSize: '1.1em', textAlign: 'center'}}
          placeholder="Start typing to search ingredients"
          value={query}
          onChange={e => filter(e.target.value, cache)}
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
  }
}

export default withStyles(s)(IngredientSearch);
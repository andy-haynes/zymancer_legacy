import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IngredientSearch.css';
import TextField from 'material-ui/TextField';

class IngredientSearch extends React.PureComponent {
  static propTypes = {
    query: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    children: PropTypes.element,
    header: PropTypes.element,
    filter: PropTypes.func.isRequired
  };

  render() {
    const { query, cache, loading, error, children, header, filter } = this.props;
    return (
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
  }
}

export default withStyles(s)(IngredientSearch);
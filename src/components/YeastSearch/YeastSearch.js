import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import YeastSearchOption from '../YeastSearchOption';
import s from './YeastSearch.css';
import TextField from 'material-ui/TextField';

const YeastSearch = ({ query, results, loading, error, addYeast, searchYeast }) => (
  <div className={s.yeastSearch}>
    <TextField
      id="yeast-search"
      className={s.searchInput}
      inputStyle={{padding: '0 8px', lineHeight: '28px', fontSize: '18px', textAlign: 'center'}}
      placeholder="Start typing to search yeast..."
      value={query}
      onChange={e => searchYeast(e.target.value)}
      style={{width: '90%'}}
    />
    <div className={s.searchResults}>
      {results.length === 0 ? '' : (
        <div className={s.resultsHeader}>
          <div className="pure-g">
            <div className="pure-u-9-24">
              <span>Name</span>
            </div>
            <div className="pure-u-7-24">
              <span>Mfg</span>
            </div>
            <div className="pure-u-4-24">
              <span>Attenuation</span>
            </div>
            <div className="pure-u-4-24">
              <span>Temp</span>
            </div>
          </div>
        </div>
      )}
      {results.map(yeast => (
        <YeastSearchOption
          key={yeast.id}
          addYeast={() => addYeast(Object.assign({}, yeast))}
          yeast={yeast}
        />
      ))}
    </div>
  </div>
);
/*
YeastSearch.propTypes = {
  search: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    name:       PropTypes.string.isRequired,
    gravity:    PropTypes.number.isRequired,
    color:      PropTypes.string.isRequired
  }).isRequired).isRequired,
  addGrain:  PropTypes.func.isRequired,
  filterGrains: PropTypes.func.isRequired
};
*/
export default withStyles(s)(YeastSearch);
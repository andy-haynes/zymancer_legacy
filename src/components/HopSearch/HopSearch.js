import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HopSearchOption from '../HopSearchOption';
import s from './HopSearch.css';
import TextField from 'material-ui/TextField';

const HopSearch = ({ query, results, loading, error, originalGravity, boilVolume, actions }) => (
  <div className={s.hopSearch}>
    <TextField
      id="hop-search"
      className={s.searchInput}
      inputStyle={{padding: '0 0.7em', lineHeight: '2.4em', fontSize: '1.1em', textAlign: 'center'}}
      placeholder="Start typing to search hops..."
      value={query}
      onChange={e => actions.searchHops(e.target.value)}
      style={{width: '90%'}}
    />
    <div className={s.searchResults}>
      {results.length === 0 ? '' : (
        <div className={s.resultsHeader}>
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
        </div>
      )}
      {results.map(hop => (
        <HopSearchOption
          key={hop.id}
          addHop={() => actions.addHop(Object.assign({}, hop), originalGravity, boilVolume)}
          hop={hop}
        />
      ))}
    </div>
  </div>
);
/*
HopSearch.propTypes = {
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
export default withStyles(s)(HopSearch);
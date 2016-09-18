import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GrainSearchOption from '../GrainSearchOption';
import s from './GrainSearch.css';
import TextField from 'material-ui/TextField';

const GrainSearch = ({ query, results, loading, error, addGrain, searchGrains }) => (
    <div className={s.grainSearch}>
      <TextField
          id="grain-search"
          className={s.searchInput}
          inputStyle={{padding: '0 8px', lineHeight: '28px', fontSize: '18px', textAlign: 'center'}}
          placeholder="Start typing to search grains..."
          value={query}
          onChange={e => searchGrains(e.target.value)}
          style={{width: '90%'}}
      />
      <div className={s.searchResults}>
        {results.length === 0 ? '' : (
          <div className={s.resultsHeader}>
            <div className="pure-g">
              <div className="pure-u-12-24">
                <span>Name</span>
              </div>
              <div className="pure-u-4-24">
                <span>Gravity</span>
              </div>
              <div className="pure-u-4-24">
                <span>Lovibond</span>
              </div>
              <div className="pure-u-4-24">
                <span>Color</span>
              </div>
            </div>
          </div>
        )}
        {results.map(grain => (
          <GrainSearchOption
            key={grain.id}
            addGrain={() => addGrain(Object.assign({}, grain))}
            {...grain}
          />
        ))}
      </div>
    </div>
);

/*
GrainSearch.propTypes = {
  query: PropTypes.string.isRequired,
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

export default withStyles(s)(GrainSearch);
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GrainSearchOption from '../GrainSearchOption';
import s from './GrainSearch.css';
import TextField from 'material-ui/TextField';

const GrainSearch = ({ query, results, loading, error, actions }) => (
    <div className={s.grainSearch}>
      <TextField
          id="grain-search"
          className={s.searchInput}
          inputStyle={{padding: '0 0.7em', lineHeight: '2.4em', fontSize: '1.1em', textAlign: 'center'}}
          placeholder="Start typing to search grains..."
          value={query}
          onChange={e => actions.searchGrains(e.target.value)}
          style={{width: '90%'}}
      />
      <div className={s.searchResults}>
        {results.length === 0 ? '' : (
          <div className={s.resultsHeader}>
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
          </div>
        )}
        {results.map(grain => (
          <GrainSearchOption
            key={grain.id}
            addGrain={() => actions.addGrain(grain)}
            grain={grain}
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
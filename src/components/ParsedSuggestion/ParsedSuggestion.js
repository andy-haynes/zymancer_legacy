import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedSuggestion.css';
import Toggle from 'material-ui/Toggle';
import round from 'lodash/round';

const ParsedSuggestion = ({ suggestion, toggle }) => (
  <div className={s.parsedSuggestion} onClick={toggle}>
    <div className="pure-g">
      <div className="pure-u-1-8">
        <Toggle
          toggled={suggestion.active}
          style={{
            position: 'relative',
            top: '0.5em'
          }}
        />
      </div>
      <div className="pure-u-7-8">
        <div className={s.parsedName}>
          {suggestion.name}
        </div>
        <div className={s.parsedMfg}>
          <a href={suggestion.url} target="_blank">
            {suggestion.mfg}
          </a>
        </div>
        <div className={s.parsedScore}>
          {round(suggestion.score, 2)}
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(s)(ParsedSuggestion);
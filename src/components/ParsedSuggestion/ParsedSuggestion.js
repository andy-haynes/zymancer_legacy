import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedSuggestion.css';
import Toggle from 'material-ui/Toggle';

const ParsedSuggestion = ({ suggestion }) => (
  <div className={s.parsedSuggestion}>
    <div className="pure-g">
      <div className="pure-u-1-8">
        <Toggle toggled={suggestion.active} />
      </div>
      <div className="pure-u-7-8">
        {suggestion.name} | {suggestion.mfg}
        {suggestion.score}
      </div>
    </div>
  </div>
);

export default withStyles(s)(ParsedSuggestion);
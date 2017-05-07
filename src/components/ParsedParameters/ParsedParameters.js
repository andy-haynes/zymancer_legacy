import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedParameters.css';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import { RecipeParameter } from '../../constants/AppConstants';

const ParsedParameters = ({ parameters }) => (
  <Paper className={s.parsedParameters} zDepth={2}>
    <div className="pure-g">
      {parameters.map((p, i) => (
        <div className="pure-u-1-2" key={`parsed-parameter-${i}`}>
          {p.parameter}: {p.value}
        </div>
      ))}
    </div>
  </Paper>
);

export default withStyles(s)(ParsedParameters);
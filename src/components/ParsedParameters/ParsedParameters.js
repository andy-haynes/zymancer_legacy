import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedParameters.css';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import { RecipeParameter } from '../../constants/AppConstants';

class ParsedParameters extends React.PureComponent {
  static propTypes = {
    parameters: PropTypes.arrayOf(PropTypes.shape({
      parameter: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }))
  };

  render() {
    return (
      <Paper className={s.parsedParameters} zDepth={2}>
        <div className="pure-g">
          {this.props.parameters.map((p, i) => (
            <div className="pure-u-1-2" key={`parsed-parameter-${i}`}>
              {p.parameter}: {p.value}
            </div>
          ))}
        </div>
      </Paper>
    );
  }
}

export default withStyles(s)(ParsedParameters);
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedParameters.css';

class ParsedParameters extends React.PureComponent {
  static propTypes = {
    parameters: PropTypes.arrayOf(PropTypes.shape({
      parameter: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired
    }))
  };

  render() {
    return (
      <div className={s.parsedParameters}>
        {this.props.parameters.map((p, i) => (
          <div
            key={`parsed-parameter-${i}`}
            className={p.selected ? s.selectedParameter : s.parameter}
            onClick={() => this.props.actions.selectParsedParameter(p.lineNumber)}
          >
            {p.parameter}: {p.value}
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(s)(ParsedParameters);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedSuggestion.css';
import Toggle from 'material-ui/Toggle';
import round from 'lodash/round';

class ParsedSuggestion extends React.PureComponent {
  static propTypes = {
    suggestion: PropTypes.shape({
      name: PropTypes.string.isRequired,
      mfg: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired
    }).isRequired,
    toggle: PropTypes.func.isRequired
  };

  render() {
    const { suggestion, toggle } = this.props;
    return (
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
  }
}

export default withStyles(s)(ParsedSuggestion);
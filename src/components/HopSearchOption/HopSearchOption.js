import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopSearchOption.css';
import round from 'lodash/round';

class HopSearchOption extends React.PureComponent {
  static propTypes = {
    hop: DefinedTypes.hop.isRequired,
    addHop: PropTypes.func.isRequired
  };

  render() {
    const { hop, addHop } = this.props;
    return (
      <div className={s.hopSearchOption} onClick={addHop}>
        <div className="pure-g">
          <div className="pure-u-12-24">
            <div className={s.hopDetail}>
              {hop.name}
              <div className={s.matchScore}>
                {round(hop.matchScore, 2)}
              </div>
              <div className={s.hopCategories}>
                {hop.categories.join(', ')}
              </div>
            </div>
          </div>
          <div className="pure-u-6-24">
            <div className={s.hopDetail}>
              {hop.alphaRange.low}
              {hop.alphaRange.high ? (` - ${hop.alphaRange.high}`) : ''}
            </div>
          </div>
          <div className="pure-u-6-24">
            <div className={s.hopDetail}>
              {hop.betaRange.low}
              {hop.betaRange.high ? (` - ${hop.betaRange.high}`) : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HopSearchOption);
import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './YeastSearchOption.css';

class YeastSearchOption extends React.PureComponent {
  static propTypes = {
    yeast: DefinedTypes.yeast.isRequired,
    addHop: PropTypes.func.isRequired
  };

  render() {
    const { yeast, addYeast } = this.props;
    return (
      <div className={s.yeastSearchOption} onClick={addYeast}>
        <div className="pure-g">
          <div className="pure-u-12-24">
            <div className={s.yeastDetail}>
              {yeast.name}
              <div className={s.matchScore}>
                {yeast.matchScore}
              </div>
            </div>
            <div className={s.subtext}>
              {yeast.mfg} {yeast.code}
            </div>
          </div>
          <div className="pure-u-6-24">
            <div className={s.yeastDetail}>
              {yeast.toleranceLow || '–'}
              {(yeast.toleranceHigh || '') && ' - ' + yeast.toleranceHigh}
              {(yeast.toleranceLow || '') && '%'}
            </div>
          </div>
          <div className="pure-u-6-24">
            <div className={s.yeastDetail}>
              {yeast.attenuationLow || '–'}
              {(yeast.attenuationHigh || '') && ' - ' + yeast.attenuationHigh}
              {(yeast.attenuationLow || '') && '%'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(YeastSearchOption);
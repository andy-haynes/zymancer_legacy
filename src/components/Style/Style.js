import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import s from './Style.css';
import zymath from '../../utils/zymath';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Error from 'material-ui/svg-icons/alert/error';
import { red700, green700 } from 'material-ui/styles/colors';

function rangeIcon(inRange) {
  return (inRange
    ? <CheckCircle className={s.rangeIcon} style={{color: green700}} />
    : <Error className={s.rangeIcon} style={{color: red700}} />
  );
}

class Style extends React.Component {
  static propTypes = {
    style: DefinedTypes.style.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.style.id !== undefined) {
      this.props.actions.loadStyle(this.props.style.id);
    }
  }

  render() {
    const { style } = this.props;
    return (
      <div className={s.style}>
        <div className="pure-g">
          <div className="pure-u-2-5">
            <div className={s.styleName}>
              {style.code}. {style.name}
            </div>
          </div>
          <div className="pure-u-1-5">
            <div className={s.label}>OG</div>
            <div className={s.styleRange}>
              {style.ogLow && zymath.formatGravity(style.ogLow)} - {style.ogHigh && zymath.formatGravity(style.ogHigh)}
              {rangeIcon(style.inOGRange)}
            </div>
            <div className={s.label}>FG</div>
            <div className={s.styleRange}>
              {style.fgLow && zymath.formatGravity(style.fgLow)} - {style.fgHigh && zymath.formatGravity(style.fgHigh)}
              {rangeIcon(style.inFGRange)}
            </div>
          </div>
          <div className="pure-u-1-5">
            <div className={s.label}>IBU</div>
            <div className={s.styleRange}>
              {style.ibuLow} - {style.ibuHigh}
              {rangeIcon(style.inIBURange)}
            </div>
            <div className={s.label}>ABV</div>
            <div className={s.styleRange}>
              {style.abvLow} - {style.abvHigh}
              {rangeIcon(style.inABVRange)}
            </div>
          </div>
          <div className="pure-u-1-5">
            <div className={s.label}>SRM</div>
            <div className={s.styleRange}>
              {style.srmLow} - {style.srmHigh}
              {rangeIcon(style.inSRMRange)}
            </div>
            <div style={{
              width: '6em',
              height: '2.6em',
              backgroundImage: `linear-gradient(to right, ${zymath.SRMtoRGB(style.srmLow)}, ${zymath.SRMtoRGB(style.srmHigh)})`
            }}>
              &nbsp;
            </div>
          </div>
          <div className="pure-u-1-1">
            <div className={s.styleNote}>
              <em>{style.description}</em>
            </div>
          </div>
          {style.overallImpression && (
            <div className="pure-u-1-3">
              <div className={s.label}>Overall Impression</div>
              <div className={s.styleText}>
                {style.overallImpression}
              </div>
            </div>
          )}
          {style.aroma && (
            <div className="pure-u-1-3">
              <div className={s.label}>Aroma</div>
              <div className={s.styleText}>
                {style.aroma}
              </div>
            </div>
          )}
          {style.mouthfeel && (
            <div className="pure-u-1-3">
              <div className={s.label}>Mouthfeel</div>
              <div className={s.styleText}>
                {style.mouthfeel}
              </div>
            </div>
          )}
          {style.comments && (
            <div className="pure-u-1-3">
              <div className={s.label}>Comments</div>
              <div className={s.styleText}>
                {style.comments}
              </div>
            </div>
          )}
          {style.history && (
            <div className="pure-u-1-3">
              <div className={s.label}>History</div>
              <div className={s.styleText}>
                {style.history}
              </div>
            </div>
          )}
          {style.characterstics && (
            <div className="pure-u-1-3">
              <div className={s.label}>Characterstics</div>
              <div className={s.styleText}>
                {style.characterstics}
              </div>
            </div>
          )}
          {style.styleComparisons && (
            <div className="pure-u-1-2">
              <div className={s.label}>Style Comparisons</div>
              <div className={s.styleText}>
                {style.styleComparisons}
              </div>
            </div>
          )}
          {style.commercialExamples && (
            <div className="pure-u-1-3">
              <div className={s.label}>Commercial Examples</div>
              <div className={s.styleText}>
                {style.commercialExamples}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Style);

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import s from './Style.css';

const Style = ({ style, actions }) => (
  <div className={s.style}>
    <div className="pure-g">
      <div className="pure-u-1-1">
        {style.overallImpression}
      </div>
    </div>
  </div>
);
/*
Fermentation.propTypes = {
  grains: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    name:       PropTypes.string.isRequired,
    gravity:    PropTypes.number.isRequired,
    color:      PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick:  PropTypes.func.isRequired
};
*/
export default withStyles(s)(Style);
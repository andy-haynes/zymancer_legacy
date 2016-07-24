import React, { PropTypes } from 'react';
import RecipeTabz from '../../components/RecipeTabz';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calculator.css';

function Calculator({ }, context) {
  return (
    <div className={s.calculator}>
      <RecipeTabz />
    </div>
  );
}

//Calculator.propTypes = {
//  news: PropTypes.arrayOf(PropTypes.shape({
//    title: PropTypes.string.isRequired,
//    link: PropTypes.string.isRequired,
//    contentSnippet: PropTypes.string
//  })).isRequired
//};
//Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Calculator);

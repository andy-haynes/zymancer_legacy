import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Parser.css';
import RecipeParserContainer from '../../containers/RecipeParser';

class Parser extends React.PureComponent {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  render() {
    context.setTitle('Recipe Parser');
    return (
      <div className={s.parser}>
        <RecipeParserContainer />
      </div>
    );
  }
}

export default withStyles(s)(Parser);

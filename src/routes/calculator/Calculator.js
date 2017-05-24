import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../components/DefinedTypes';
import RecipeContainer from '../../containers/Recipe';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import pick from 'lodash/pick';
import s from './Calculator.css';

const title = 'Zymancer';

class Calculator extends React.PureComponent {
  static propTypes = {
    recipe: DefinedTypes.recipe
  };

  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.setTitle(title);
    return (
      <div className={s.calculator}>
        <RecipeContainer {...pick(this.props, 'recipe', 'isMobile')} />
      </div>
    );
  }
}

export default withStyles(s)(Calculator);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IngredientTab.css';
import SearchDrawer from '../SearchDrawer';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { grey500 } from 'material-ui/styles/colors';

class IngredientTab extends React.PureComponent {
  static propTypes = {
    chart: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    detail: PropTypes.object,
    ingredients: PropTypes.arrayOf(PropTypes.element).isRequired,
    search: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired
  };

  render() {
    const { chart, detail, ingredients, search, removeIngredient } = this.props;
    return (
      <SearchDrawer {...{ search }}>
        <div className={s.ingredients}>
          {chart && (
            <div className={s.chart}>
              {chart}
            </div>
          )}
          <List className={s.ingredientList}>
            {ingredients.map((ingredient, i) => (
              <ListItem
                key={i}
                disabled
                innerDivStyle={{padding: '0.8em 0.4em 0.8em 0.1em'}}
                rightIcon={
                  <IconButton onTouchTap={() => removeIngredient(ingredient.props.ingredient)}>
                    <CloseIcon color={grey500} />
                  </IconButton>
                }
              >
                {ingredient}
              </ListItem>
            ))}
          </List>
          {detail && (
            <div className={s.detail}>
              {detail}
            </div>
          )}
        </div>
      </SearchDrawer>
    );
  }
}

export default withStyles(s)(IngredientTab);
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IngredientPage.css';
import SearchDrawer from '../SearchDrawer';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { grey500 } from 'material-ui/styles/colors';

const IngredientPage = ({ chart, ingredients, search, removeIngredient }) => (
  <SearchDrawer search={search}>
    <div className={s.ingredients}>
      <div className={s.chart}>
        {chart}
      </div>
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
    </div>
  </SearchDrawer>
);
/*
IngredientPage.propTypes = {
};
*/
export default withStyles(s)(IngredientPage);
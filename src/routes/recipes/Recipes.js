import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recipes.css';
import SavedRecipesContainer from '../../containers/SavedRecipesContainer';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

function Recipes(props, context) {
  context.setTitle('Saved Recipes');
  return (
    <div className={s.recipes}>
      <Tabs>
        <Tab label="Saved">
          <SavedRecipesContainer />
        </Tab>
        <Tab label="Shared">
        </Tab>
        <Tab label="Public">
        </Tab>
        <Tab label="Parse">
        </Tab>
      </Tabs>
    </div>
  );
}

Recipes.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Recipes);

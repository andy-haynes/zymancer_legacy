import React from 'react';
import Calculator from './Calculator';
import actions from '../../actions';
import { getRecipe } from '../../data/api';


export default {
  path: '/',
  async action({ next }) {
    return await next();
  },
  children: [{
    path: '/',
    async action({ isMobile }) {
      return <Calculator {...{ isMobile }} />;
    }
  }, {
    path: '/recipe/:id',
    async action({ context, isMobile }, { id }) {
      const recipe = process.env.BROWSER && await getRecipe(id);
      if (recipe) {
        context.store.dispatch(actions.saved.loadSavedRecipe(recipe));
      }
      return <Calculator {...{ isMobile }} />;
    }
  }]
};

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
    async action() {
      return (
        <Calculator />
      );
    }
  }, {
    path: '/recipe/:id',
    async action({ context }, { id }) {
      const recipe = process.env.BROWSER && await getRecipe(id);
      if (recipe) {
        context.store.dispatch(actions.saved.loadSavedRecipe(recipe));
      }
      return <Calculator />
    }
  }]
};

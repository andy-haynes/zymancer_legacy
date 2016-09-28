import React from 'react';
import Calculator from './Calculator';
import currentRecipe from '../../reducers/currentRecipe';
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
    async action(context, { id }) {
      const recipe = process.env.BROWSER && await getRecipe(id);
      return <Calculator recipe={recipe} />
    }
  }]
};

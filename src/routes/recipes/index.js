import React from 'react';
import Recipes from './Recipes';

export default {
  path: '/recipes',
  async action() {
    return <Recipes />;
  }
};
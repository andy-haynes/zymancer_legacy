import React from 'react';
import Home from './Home';
import Calculator from '../calculator/Calculator';
import actions from '../../actions';


export default {
  path: '/',
  async action({ next }) {
    return await next();
  },
  children: [{
    path: '/',
    async action({ isMobile }) {
      if (isMobile) {
        return <Calculator {...{ isMobile }} />;
      }

      return <Home />
    }
  }]
};

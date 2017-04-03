import React from 'react';
import Parser from './Parser';

export default {
  path: '/parser',
  async action() {
    return <Parser />;
  }
};
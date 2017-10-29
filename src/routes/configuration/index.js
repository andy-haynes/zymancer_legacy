import React from 'react';
import Configuration from './Configuration';
import fetch from '../../core/fetch';

export default {
  path: '/config',
  async action({ user }) {
    return <Configuration />;
  }
};

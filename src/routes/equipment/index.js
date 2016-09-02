import React from 'react';
import Equipment from './Equipment';
import fetch from '../../core/fetch';

export default {
  path: '/equipment',
  async action({ user }) {
    const data = {equipmentProfiles: []};
    return <Equipment profiles={data.equipmentProfiles} />;
  }
};

import React from 'react';
import Recipes from './Recipes';
import fetch from '../../core/fetch';

export default {
  path: '/recipes',
  async action({ user }) {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{recipes(userId:${user.id}){id,name,style}}`
      }),
      credentials: 'include'
    });

    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }

    const { data } = await resp.json();
    if (!data || !data.recipes) {
      return undefined;
    }

    return <Recipes recipes={data.recipes} />;
  }
};

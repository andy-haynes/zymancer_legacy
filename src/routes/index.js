/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Child routes
import home from './home';
import contact from './contact';
import login from './login';
import content from './content';
import error from './error';
import calculator from './calculator';
import recipes from './recipes';
import parser from './parser';
import configuration from './configuration';

export default {
  path: '/',
  children: [
    home,
    calculator,
    recipes,
    parser,
    configuration,
    contact,
    login,
    content,
    error
  ],
  async action({ next, render, context }) {
    const muiTheme = getMuiTheme({
      tabs: { backgroundColor: '#777' },
      inkBar: { backgroundColor: '#0cf' }
    });

    const component = await next();

    if (component === undefined) {
      return component;
    }

    return render(
      <MuiThemeProvider muiTheme={muiTheme}>
        <App context={context}>
          {component}
        </App>
      </MuiThemeProvider>
    );
  }
};

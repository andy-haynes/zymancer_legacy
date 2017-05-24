/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';

class Header extends React.PureComponent {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation authenticated={this.props.authenticated}/>
          <Link className={s.brand} to="/">
            <span className={s.runes}>ᚨᛚᚢ</span>
            <span className={s.brandTxt}>Zymancer</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);

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

class Header extends React.PureComponent {
  static propTypes = {
    activeRoute: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { activeRoute, authenticated, actions } = this.props;
    const setRoute = (route) => (e) => actions.setRoute(route);

    const createLink = (route, title) => (
      <Link
        className={s.link}
        to={route}
        onClick={setRoute(route)}
        data-active={activeRoute === route}
      >
        {title}
      </Link>
    );

    const accountLink = authenticated ? (
      <span>
          <a className={s.link} href="/logout">Log out</a>
        </span>
    ) : createLink('/login', 'Log In');

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.navigation}>
            {createLink('/', 'Home')}
            <span className={s.spacer}>|</span>
            {createLink('/calculator', 'Calculator')}
            <span className={s.spacer}>|</span>
            {createLink('/recipes', 'Recipes')}
            <span className={s.spacer}>|</span>
            {createLink('/parser', 'Parser')}
            <span className={s.spacer}>|</span>
            {createLink('/config', 'Configure')}
            <span className={s.spacer}>|</span>
            {accountLink}
          </div>
          <Link className={s.brand} to="/" onClick={setRoute('/')}>
            <span className={s.runes}>ᚨᛚᚢ</span>
            <span className={s.brandTxt}>Zymancer</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);

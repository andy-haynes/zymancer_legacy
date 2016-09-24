/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

function Navigation({ className, userLoggedIn }) {
  const accountLink = userLoggedIn ? (
      <span>
        <Link className={s.link} to="/account">Account</Link>
        <span className={s.spacer}>|</span>
        <a className={s.link} href="/logout">Log out</a>
      </span>
  ) : (<Link className={s.link} to="/login">Log in</Link>);

  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={s.link} to="/">Calculator</Link>
      <span className={s.spacer}>|</span>
      <Link className={s.link} to="/recipes">Recipes</Link>
      <span className={s.spacer}>|</span>
      <Link className={s.link} to="/equipment">Equipment</Link>
      <span className={s.spacer}>|</span>
      <Link className={s.link} to="/contact">Contact</Link>
      <span className={s.spacer}>|</span>
      {accountLink}
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
  userLoggedIn: PropTypes.bool
};

export default withStyles(s)(Navigation);

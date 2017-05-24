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
import s from './Navigation.css';
import Link from '../../Link';
import { MobileRecipeTab } from '../../../constants/AppConstants';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { lightBlue600 } from 'material-ui/styles/colors';

class Navigation extends React.PureComponent {
  static propTypes = {
    selectMobileTab: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
  };

  render() {
    const { authenticated } = this.props;
    const accountLink = authenticated ? (
        <span>
          <a className={s.link} href="/logout">Log out</a>
        </span>
    ) : (<Link navlink className={s.link} to="/login">Log in</Link>);

    return (
      <div className={s.root} role="navigation">
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MenuIcon color={lightBlue600} />
            </IconButton>
          }
        >
          <MenuItem onTouchTap={() => selectMobileTab(MobileRecipeTab.Root)}>Recipe</MenuItem>
          <MenuItem onTouchTap={() => selectMobileTab(MobileRecipeTab.Grains)}>Grains</MenuItem>
          <MenuItem onTouchTap={() => selectMobileTab(MobileRecipeTab.Hops)}>Hops</MenuItem>
          <MenuItem onTouchTap={() => selectMobileTab(MobileRecipeTab.Mash)}>Mash</MenuItem>
          <MenuItem onTouchTap={() => selectMobileTab(MobileRecipeTab.Fermentation)}>Fermentation</MenuItem>
          <MenuItem onTouchTap={() => selectMobileTab(MobileRecipeTab.Style)}>Style</MenuItem>
          <MenuItem><Link navlink className={s.link} to="/recipes">Recipes</Link></MenuItem>
          <MenuItem>{accountLink}</MenuItem>
        </IconMenu>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);

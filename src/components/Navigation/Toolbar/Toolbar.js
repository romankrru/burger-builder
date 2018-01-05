import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Tollbar.css';
import Toggle from '../Toggle/Toggle';

const Toolbar = props => (
  <header className={styles.Toolbar}>
    <Toggle onClick={props.togggleSideDrawer} />
    <Logo />
    <nav className={[styles.Navigation, styles.DesktopOnly].join(' ')}>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

Toolbar.propTypes = {
  togggleSideDrawer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Toolbar;

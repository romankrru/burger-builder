import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Tollbar.css';
import Toggle from '../Toggle/Toggle';

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <Toggle onClick={props.togggleSideDrawer} />
      <Logo />
      <nav className={[styles.Navigation, styles.DesktopOnly].join(' ')}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
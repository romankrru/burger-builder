import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Tollbar.css';

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav className={styles.Navigation}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
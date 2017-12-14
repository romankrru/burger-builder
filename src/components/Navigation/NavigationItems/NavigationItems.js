import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.css';

const NavigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem active link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default NavigationItems;

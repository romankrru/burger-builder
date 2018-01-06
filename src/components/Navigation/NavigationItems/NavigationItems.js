import React from 'react';
import PropTypes from 'prop-types';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.css';

const NavigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem active link="/">Burger Builder</NavigationItem>
    {props.isAuthenticated ?
      <NavigationItem link="/orders">Orders</NavigationItem> :
      null
    }
    {props.isAuthenticated ?
      <NavigationItem link="/logout">Logout</NavigationItem> :
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    }
  </ul>
);

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavigationItems;

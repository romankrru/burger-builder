import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.css';

const NavigationItem = props => (
  <li className={styles.NavigationItem}>
    <NavLink
      exact
      activeClassName={styles.active}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

NavigationItem.defaultProps = {
  link: '',
};

NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
};

export default NavigationItem;

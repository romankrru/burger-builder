import React from 'react';
import PropTypes from 'prop-types';

import styles from './NavigationItem.css';

const NavigationItem = props => (
  <li className={styles.NavigationItem}>
    <a
      className={props.active ? styles.active : null}
      href={props.link}
    >
      {props.children}
    </a>
  </li>
);

NavigationItem.defaultProps = {
  active: false,
  link: '',
};

NavigationItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
};

export default NavigationItem;

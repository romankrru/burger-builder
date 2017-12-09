import React from 'react';
import PropTypes from 'prop-types';

import styles from './Logo.css';
import burgerLogo from '../../assets/img/burger-logo.png';

const Logo = props => (
  <div className={styles.Logo} style={props.style}>
    <img src={burgerLogo} alt="burger logo" />
  </div>
);

Logo.defaultProps = {
  style: {},
};

Logo.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
};

export default Logo;

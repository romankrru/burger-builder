import React from 'react';

import styles from './Logo.css';
import burgerLogo from '../../assets/img/burger-logo.png';

const Logo = (props) => {
  return (
    <div className={styles.Logo} style={props.style}>
      <img src={burgerLogo} alt="burger logo" />
    </div>
  );
};

export default Logo;
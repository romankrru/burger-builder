import React from 'react';

import styles from './Toggle.css';

const Toggle = (props) => {
  return (
    <div className={styles.Toggle} onClick={props.onClick}>
      <div></div>
      <div></div>
      <div></div>      
    </div>
  );
};

export default Toggle;
import React from 'react';

import styles from './Backdrop.css';

const Backdrop = (props) => {
  if (props.show) {
    return (
      <div className={styles.Backdrop} onClick={props.onClick}></div>
    );
  }

  return null;
};

export default Backdrop;
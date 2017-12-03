import React from 'react';

import styles from './Backdrop.css';

const Backdrop = (props) => {
  if (props.show) {
    return (
      <div className={styles.Backdrop} onClick={props.cancelPurchasing}></div>
    );
  }

  return null;
};

export default Backdrop;
import React from 'react';

import styles from './BuildControl.css';

const BuildControl = (props) => {
  return (
    <div className={styles.BuildControl} >
      <span className={styles.label}>
        {props.label}
      </span>
      <button
        disabled={props.disabled}
        onClick={() => props.onIngridientRemove(props.type)}
      >
        Less
      </button>
      <button
        onClick={() => props.onIngridientAdd(props.type)}
      >
        More
      </button>
    </div>
  );
};

export default BuildControl;
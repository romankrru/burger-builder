import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.css';

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} cancelPurchasing={props.cancelPurchasing} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%, -100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
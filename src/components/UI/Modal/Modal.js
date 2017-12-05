import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.css';

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} onClick={props.cancelPurchasing} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? 'translate(-50%, 0%)' : 'translate(-50%, -150vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
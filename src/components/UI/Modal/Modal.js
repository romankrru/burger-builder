import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} onClick={this.props.cancelPurchasing} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translate(-50%, 0%)' : 'translate(-50%, -150vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
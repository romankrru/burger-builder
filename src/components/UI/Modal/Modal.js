import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} onClick={this.props.backdropClick} />
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

Modal.defaultProps = {
  show: false,
  children: null,
  backdropClick: () => {},
};

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  backdropClick: PropTypes.func,
};

export default Modal;

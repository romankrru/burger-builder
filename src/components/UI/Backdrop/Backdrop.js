import React from 'react';
import PropTypes from 'prop-types';

import styles from './Backdrop.css';

const Backdrop = (props) => {
  if (props.show) {
    return (
      <div className={styles.Backdrop} onKeyPress={props.onClick} onClick={props.onClick} role="button" tabIndex={0} />
    );
  }

  return null;
};

Backdrop.defaultProps = {
  show: false,
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;

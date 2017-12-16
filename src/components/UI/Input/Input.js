import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

const Input = ({ inputType, label, ...props }) => {
  let inputElement = null;

  switch (inputType) {
    case 'input':
      inputElement = <input className={styles.InputElement} {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className={styles.InputElement} {...props} />;
      break;
    default:
      inputElement = <input className={styles.InputElement} {...props} />;
  }


  return (
    <div className={styles.Input}>
      <div className={styles.Label}>{label}</div>
      {inputElement}
    </div>
  );
};

Input.defaultProps = {
  label: '',
  inputType: 'input',
};

Input.propTypes = {
  label: PropTypes.string,
  inputType: PropTypes.string,
};

export default Input;

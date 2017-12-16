import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

/* eslint-disable */

const Input = ({ inputType, label, value, elementConfig }) => {
  let inputElement = null;

  console.log()

  switch (inputType) {
    case 'input':
      inputElement = <input className={styles.InputElement} {...elementConfig} />;
      break;
    case 'textarea':
      inputElement = <textarea className={styles.InputElement} {...elementConfig} />;
      break;
    default:
      inputElement = <input className={styles.InputElement} {...elementConfig} />;
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

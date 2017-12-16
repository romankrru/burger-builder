import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

/* eslint-disable */

const Input = ({ inputType, label, value, elementConfig }) => {
  let inputElement = null;

  console.log()

  switch (inputType) {
    case 'input':
      inputElement = <input value={value} className={styles.InputElement} {...elementConfig} />;
      break;
    case 'textarea':
      inputElement = <textarea value={value} className={styles.InputElement} {...elementConfig} />;
      break;
    case 'select':
      inputElement = (
        <select className={styles.InputElement} value={value}>
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
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

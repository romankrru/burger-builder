import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

/* eslint-disable */

const Input = ({ inputType, changed, label, value, valid, shouldValidate, isTouched, name, elementConfig }) => {
  let inputElement = null;

  const attachedClasses = [styles.InputElement];

  if (!valid && shouldValidate && isTouched) {
    attachedClasses.push(styles.Invalid);
  }

  console.log(attachedClasses);

  switch (inputType) {
    case 'input':
      inputElement = (
        <input
          name={name}
          onChange={(e) => changed(e, name)}
          value={value}
          className={attachedClasses.join(' ')}
          {...elementConfig}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          name={name}
          onChange={(e) => changed(e, name)}
          value={value}
          className={attachedClasses.join(' ')}
          {...elementConfig}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          name={name}
          onChange={(e) => changed(e, name)}
          className={attachedClasses.join(' ')}
          value={value}
        >
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

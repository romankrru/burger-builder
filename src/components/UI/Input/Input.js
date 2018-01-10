import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

const Input = ({
  inputType, changed, label, value, valid, shouldValidate, isTouched, name, elementConfig,
}) => {
  let inputElement = null;

  const attachedClasses = [styles.InputElement];

  if (!valid && shouldValidate && isTouched) {
    attachedClasses.push(styles.Invalid);
  }

  switch (inputType) {
    case 'input':
      inputElement = (
        <input
          name={name}
          onChange={e => changed(e, name)}
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
          onChange={e => changed(e, name)}
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
          onChange={e => changed(e, name)}
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
  valid: true,
  shouldValidate: {},
  isTouched: false,
  name: '',
  elementConfig: {},
};

Input.propTypes = {
  label: PropTypes.string,
  inputType: PropTypes.string,
  changed: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  shouldValidate: PropTypes.objectOf(PropTypes.any),
  isTouched: PropTypes.bool,
  name: PropTypes.string,
  elementConfig: PropTypes.objectOf(PropTypes.any),
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.css';

const Button = props => (
  <button
    onClick={props.clicked}
    className={[styles.Button, styles[props.btnType]].join(' ')}
  >
    {props.children}
  </button>
);

Button.defaultProps = {
  children: null,
  clicked: () => {},
  btnType: 'Success',
};

Button.propTypes = {
  children: PropTypes.node,
  clicked: PropTypes.func,
  btnType: PropTypes.string,
};

export default Button;

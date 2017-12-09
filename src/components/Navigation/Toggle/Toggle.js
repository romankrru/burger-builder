import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toggle.css';

const Toggle = props => (
  <div className={styles.Toggle} onKeyPress={props.onClick} onClick={props.onClick} role="button" tabIndex={0}>
    <div />
    <div />
    <div />
  </div>
);

Toggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Toggle;

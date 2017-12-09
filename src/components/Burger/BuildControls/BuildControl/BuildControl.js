import React from 'react';
import PropTypes from 'prop-types';

import styles from './BuildControl.css';

const BuildControl = props => (
  <div className={styles.BuildControl} >
    <span className={styles.label}>
      {props.label}
    </span>
    <button
      disabled={props.disabled}
      onClick={() => props.onIngridientRemove(props.type)}
    >
        Less
    </button>
    <button
      onClick={() => props.onIngridientAdd(props.type)}
    >
        More
    </button>
  </div>
);

BuildControl.defaultProps = {
  disabled: false,
};

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onIngridientRemove: PropTypes.func.isRequired,
  onIngridientAdd: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default BuildControl;

/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.css';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
];

const BuildControls = props => {
  return (
    <div className={styles.BuildControls} >
      <p>Total price: {props.totalPrice.toFixed(2)}</p>
      {
        controls.map((control, index) => (
          <BuildControl
            key={index}
            label={control.label}
            type={control.type}
            disabled={props.disabledInfo[control.type]}
            onIngridientAdd={props.onIngridientAdd}
            onIngridientRemove={props.onIngridientRemove}
          />
        ))
      }
      <button
        disabled={!props.purchasable}
        onClick={props.purchasing}
        className={styles.ordernow}
      >
        ORDER NOW!
    </button>
    </div>
  );
};

BuildControls.defaultProps = {
  purchasable: false,
};


BuildControls.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  disabledInfo: PropTypes.objectOf(PropTypes.bool).isRequired,
  onIngridientAdd: PropTypes.func.isRequired,
  onIngridientRemove: PropTypes.func.isRequired,
  purchasing: PropTypes.func.isRequired,
  purchasable: PropTypes.bool,
};

export default BuildControls;

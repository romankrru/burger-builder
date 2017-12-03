import React from 'react';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
];

const BuildControls = (props) => {
  return (
    <div>
      <p>Total price: {props.totalPrice.toFixed(2)}</p>
      {
        controls.map((control, index) => {
          return (
            <BuildControl 
              key={index}
              label={control.label}
              type={control.type}
              disabled={props.disabledInfo[control.type]}
              onIngridientAdd={props.onIngridientAdd}
              onIngridientRemove={props.onIngridientRemove}
            />  
          );
        })
      }
      <button
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        ORDER NOW!
      </button>
    </div>
  );
};

export default BuildControls;
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
    </div>
  );
};

export default BuildControls;
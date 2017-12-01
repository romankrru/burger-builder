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
        controls.map((control) => {
          return <BuildControl label={control.label} />
        })
      }
    </div>
  );
};

export default BuildControls;
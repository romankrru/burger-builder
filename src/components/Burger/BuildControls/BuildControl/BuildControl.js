import React from 'react';

const BuildControl = (props) => {
  return (
    <div>
      {props.label}
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
};

export default BuildControl;
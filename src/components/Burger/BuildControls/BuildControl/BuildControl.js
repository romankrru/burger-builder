import React from 'react';

const BuildControl = (props) => {
  return (
    <div>
      {props.label}
      <button>Less</button>
      <button>More</button>
    </div>
  );
};

export default BuildControl;
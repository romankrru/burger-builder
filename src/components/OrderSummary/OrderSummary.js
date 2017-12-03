import React from 'react';

import Aux from '../../hoc/Auxiliary.js';

const OrderSummary = (props) => {
  const summary = Object.keys(props.ingridients)
    .map((ingridientKey) => {
      return (
        <li key={ingridientKey}>
          <span style={{textTransform: 'capitalize'}}>{ingridientKey}</span>
          : {props.ingridients[ingridientKey]}
        </li>
      );
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingridients:</p>
      <ul>
        {summary}
      </ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
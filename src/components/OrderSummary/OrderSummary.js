import React from 'react';

import Aux from '../../hoc/Auxiliary.js';
import Button from '../UI/Button/Button';

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
      <p><strong>Total price: {props.price}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.cancelPurchasing}>Cancel</Button>
      <Button btnType='Success' clicked={props.continuePurchasing}>Continue</Button>      
    </Aux>
  );
};

export default OrderSummary;
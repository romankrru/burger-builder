import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';

const CheckoutSummary = () => (
  <div className={styles.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <Burger ingridients={{
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    }}
    />

    <Button btnType="Danger">Cancel</Button>
    <Button btnType="Success">Continue</Button>
  </div>
);

export default CheckoutSummary;

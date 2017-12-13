import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';

const CheckoutSummary = props => (
  <div className={styles.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <Burger ingridients={{
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    }}
    />

    <Button btnType="Danger" clicked={props.history.goBack}>Cancel</Button>
    <Button
      btnType="Success"
      clicked={() => (
        props.history.replace('/checkout/contact-data')
      )}
    >
      Continue
    </Button>
  </div>
);

CheckoutSummary.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(CheckoutSummary);

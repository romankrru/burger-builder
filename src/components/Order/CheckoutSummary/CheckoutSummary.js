import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';

const CheckoutSummary = props => (
  <div className={styles.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <Burger ingridients={props.ingridients} />

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
  ingridients: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default withRouter(CheckoutSummary);

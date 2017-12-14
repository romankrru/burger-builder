import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  constructor(props) {
    super(props);

    const query = new URLSearchParams(this.props.location.search);
    const ingridients = {};
    let price;

    [...query.entries()].forEach((key) => {
      if (key[0] === 'price') {
        [, price] = key;
      } else {
        ingridients[key[0]] = +key[1];
      }
    });


    this.state = {
      ingridients,
      totalPrice: price,
    };
  }

  render() {
    return (

      <div>
        <CheckoutSummary ingridients={this.state.ingridients} />
        <Route
          path={`${this.props.match.url}/contact-data`}
          render={props => (
            <ContactData
              totalPrice={this.state.totalPrice}
              ingridients={this.state.ingridients}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}


export default Checkout;

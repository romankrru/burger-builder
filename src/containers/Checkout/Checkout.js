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

    [...query.entries()].forEach((key) => {
      ingridients[key[0].trim()] = +key[1].trim();
    });


    this.state = {
      ingridients,
    };
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingridients={this.state.ingridients} />
        <Route path={`${this.props.match.url}/contact-data`} component={ContactData} />
      </div>
    );
  }
}


export default Checkout;

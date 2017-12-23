/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingridients={this.props.ings} />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  price: state.totalPrice,
  ings: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);

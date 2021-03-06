import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    ings: PropTypes.objectOf(PropTypes.any).isRequired,
    purchased: PropTypes.bool.isRequired,
  }

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary ingridients={this.props.ings} />;
          <Route
            path={`${this.props.match.url}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => ({
  price: state.burgerBuilder.totalPrice,
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);

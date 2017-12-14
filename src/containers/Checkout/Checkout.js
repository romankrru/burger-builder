import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  constructor(props) {
    super(props);

    // console.log(this.props);

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
      </div>
    );
  }
}


export default Checkout;

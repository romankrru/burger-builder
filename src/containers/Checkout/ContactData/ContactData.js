import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';

class ContactData extends Component {
  static propTypes = {
    ingridients: PropTypes.objectOf(PropTypes.number).isRequired,
    totalPrice: PropTypes.string.isRequired,
  }

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const data = {
      ingridients: this.props.ingridients,
      date: String(new Date()),
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Roman',
        address: {
          country: 'Russia',
          street: 'Teststreet',
          zip: '123123',
        },
        email: 'rm07ru@gmail.com',
      },
      deliveryMethod: 'fastest',
    };

    axios.post('/orders.json', data)
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    let form = <Spinner />;

    if (this.state.loading === false) {
      form = (
        <form>
          <input value={this.state.name} type="text" name="name" placeholder="Name" />
          <input value={this.state.email} type="email" name="email" placeholder="Email" />
          <input value={this.state.address.street} type="text" name="street" placeholder="Street" />
          <input value={this.state.address.postalCode} type="text" name="postal" placeholder="Postal code" />
          <Button clicked={this.orderHandler}>Order now</Button>
        </form>
      );
    }

    return (
      <div className={styles.ContactData}>
        {form}
      </div>
    );
  }
}

export default ContactData;

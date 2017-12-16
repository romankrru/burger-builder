import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.css';

class ContactData extends Component {
  static propTypes = {
    ingridients: PropTypes.objectOf(PropTypes.number).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
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
        this.props.history.replace('/');
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
        this.props.history.replace('/');
      });
  }

  render() {
    let form = <Spinner />;

    if (this.state.loading === false) {
      form = (
        <form>
          <Input value={this.state.name} type="text" name="name" placeholder="Name" />
          <Input value={this.state.email} type="email" name="email" placeholder="Email" />
          <Input value={this.state.address.street} type="text" name="street" placeholder="Street" />
          <Input value={this.state.address.postalCode} type="text" name="postal" placeholder="Postal code" />
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

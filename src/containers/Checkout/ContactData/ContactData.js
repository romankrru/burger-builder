import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.css';

/* eslint-disable */

class ContactData extends Component {
  static propTypes = {
    ingridients: PropTypes.objectOf(PropTypes.number).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    totalPrice: PropTypes.string.isRequired,
  }

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Russia',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastes', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        }
      }
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
      totalPrice: this.props.totalPrice,
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

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
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE',
        },
        value: '',
      },
      delivery: {
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

    const formData = {};
    
    Object.keys(this.state.orderForm).forEach(element => {
      formData[element] = this.state.orderForm[element].value;
    });

    const data = {
      ingridients: this.props.ingridients,
      totalPrice: this.props.totalPrice,
      customer: formData,
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

  onInputChangeHandler = (e, id) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedElement = {...updatedOrderForm[id]};
    updatedElement.value = e.target.value;

    updatedOrderForm[id] = updatedElement;

    this.setState({
      orderForm: updatedOrderForm,
    });
  }

  render() {
    let form = <Spinner />;

    if (this.state.loading === false) {
      const formElements = Object.keys(this.state.orderForm).map(inputName => {
        return (
          <Input
            key={inputName}
            name={inputName}
            inputType={this.state.orderForm[inputName].elementType}
            value={this.state.orderForm[inputName].value}
            elementConfig={this.state.orderForm[inputName].elementConfig}
            changed={this.onInputChangeHandler}
          />
        )
      })

      form = (
        <form onSubmit={this.orderHandler}>
          {formElements}
          <Button>Order now</Button>
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

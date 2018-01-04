/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import styles from './ContactData.css';


class ContactData extends Component {
  static propTypes = {
    ingridients: PropTypes.objectOf(PropTypes.number).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    totalPrice: PropTypes.string.isRequired,
  }

  state = {
    loading: false,
    formIsValid: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Russia',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastes', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastes',
      }
    },
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
      ingridients: this.props.ings,
      totalPrice: this.props.price,
      customer: formData,
    };


    this.props.onOrderBurger(data);
  }

  onInputChangeHandler = (e, id) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[id] };

    updatedElement.value = e.target.value;

    if (updatedElement.validation) {
      updatedElement.valid = this.checkValidity(e.target.value, updatedOrderForm[id].validation);
      updatedElement.touched = true;
    }

    updatedOrderForm[id] = updatedElement;

    let formIsValid = true;

    Object.keys(updatedOrderForm).forEach((el) => {
      if (
        updatedOrderForm[el].hasOwnProperty('valid') &&
        !updatedOrderForm[el].valid && formIsValid
      ) {
        formIsValid = false;
      }
    });

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required === true) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  render() {
    let form = <Spinner />;

    if (this.props.loading === false) {
      const formElements = Object.keys(this.state.orderForm).map(inputName => {
        return (
          <Input
            key={inputName}
            name={inputName}
            inputType={this.state.orderForm[inputName].elementType}
            value={this.state.orderForm[inputName].value}
            elementConfig={this.state.orderForm[inputName].elementConfig}
            valid={this.state.orderForm[inputName].valid}
            shouldValidate={this.state.orderForm[inputName].validation}
            isTouched={this.state.orderForm[inputName].touched}
            changed={this.onInputChangeHandler}
          />
        )
      })

      form = (
        <form onSubmit={this.orderHandler}>
          {formElements}
          <Button disabled={!this.state.formIsValid}>Order now</Button>
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

const mapStateToProps = state => ({
  price: state.totalPrice,
  ings: state.ingredients,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
});

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import styles from './ContactData.css';
import checkValidity from '../../../shared/chekValidity';


class ContactData extends Component {
  static propTypes = {
    ings: PropTypes.objectOf(PropTypes.number).isRequired,
    price: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    onOrderBurger: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  state = {
    formIsValid: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
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
      },
    },
  }

  onInputChangeHandler = (e, id) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[id] };

    updatedElement.value = e.target.value;

    if (updatedElement.validation) {
      updatedElement.valid = checkValidity(e.target.value, updatedOrderForm[id].validation);
      updatedElement.touched = true;
    }

    updatedOrderForm[id] = updatedElement;

    let formIsValid = true;

    Object.keys(updatedOrderForm).forEach((el) => {
      if (
        updatedOrderForm[el].valid &&
        !updatedOrderForm[el].valid && formIsValid
      ) {
        formIsValid = false;
      }
    });

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid,
    });
  }

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};

    Object.keys(this.state.orderForm).forEach((element) => {
      formData[element] = this.state.orderForm[element].value;
    });

    const data = {
      ingridients: this.props.ings,
      totalPrice: this.props.price,
      customer: formData,
      userId: this.props.userId,
    };


    this.props.onOrderBurger(data, this.props.token);
  }

  render() {
    let form = <Spinner />;

    if (this.props.loading === false) {
      const formElements = Object.keys(this.state.orderForm).map(inputName => (
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
      ));

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
  price: state.burgerBuilder.totalPrice,
  ings: state.burgerBuilder.ingredients,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

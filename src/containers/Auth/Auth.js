/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    }
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

  onInputChangeHandler = (e, id) => {
    const updatedControls = { ...this.state.controls };
    const updatedElement = { ...updatedControls[id] };

    updatedElement.value = e.target.value;

    if (updatedElement.validation) {
      updatedElement.valid = this.checkValidity(e.target.value, updatedControls[id].validation);
      updatedElement.touched = true;
    }

    updatedControls[id] = updatedElement;

    this.setState({
      controls: updatedControls,
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
    );
  }

  render() {
    const formElements = Object.keys(this.state.controls).map(inputName => {
      return (
        <Input
          key={inputName}
          name={inputName}
          inputType={this.state.controls[inputName].elementType}
          value={this.state.controls[inputName].value}
          elementConfig={this.state.controls[inputName].elementConfig}
          valid={this.state.controls[inputName].valid}
          shouldValidate={this.state.controls[inputName].validation}
          isTouched={this.state.controls[inputName].touched}
          changed={this.onInputChangeHandler}
        />
      )
    });

    return (
      <div className={styles.Auth}>
        <form onSubmit={this.onFormSubmit}>
          {formElements}
          <Button>Submit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.auth(email, password)),
});

export default connect(null, mapDispatchToProps)(Auth);
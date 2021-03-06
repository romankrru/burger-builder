import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import checkValidity from '../../shared/chekValidity';

class Auth extends Component {
  state = {
    isSignIn: false,
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
    },
  }

  componentDidMount() {
    if (this.props.building) {
      this.props.onSetAuthRedirectPath('/checkout');
    } else {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  onInputChangeHandler = (e, id) => {
    const updatedControls = { ...this.state.controls };
    const updatedElement = { ...updatedControls[id] };

    updatedElement.value = e.target.value;

    if (updatedElement.validation) {
      updatedElement.valid = checkValidity(e.target.value, updatedControls[id].validation);
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
      this.state.isSignIn,
    );
  }

  onSwitchButtonClick = () => {
    this.setState(prevState => ({
      isSignIn: !prevState.isSignIn,
    }));
  }

  render() {
    const formElements = Object.keys(this.state.controls).map(inputName => (
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
    ));

    let form = (
      <form onSubmit={this.onFormSubmit}>
        {formElements}
        <Button>{this.state.isSignIn ? 'Sign in' : 'Sign up'}</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;

    if (this.props.error) {
      const msg =
        this.props.error.response.data.error.message
          .split('_')
          .join(' ');

      errorMsg = <p style={{ color: 'red' }}>{msg}</p>;
    }

    return (
      <div className={styles.Auth}>

        {this.props.isAuthenticated ?
          <Redirect to={this.props.authRedirectPath} /> :
          null
        }

        <h2>{this.state.isSignIn ? 'Sign in' : 'Sign up'}</h2>
        {errorMsg}
        {form}
        <Button
          btnType="Danger"
          clicked={this.onSwitchButtonClick}
        >
          Switch to {this.state.isSignIn ? 'SIGN UP' : 'SIGN IN'}
        </Button>
      </div>
    );
  }
}

Auth.defaultProps = {
  error: null,
};

Auth.propTypes = {
  building: PropTypes.bool.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
  onAuth: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  isAuthenticated: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  building: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

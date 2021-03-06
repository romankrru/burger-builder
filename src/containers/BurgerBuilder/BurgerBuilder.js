import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onIngredientInited();
  }

  updatePurchasable = () => {
    const ingredients = this.props.ings;

    const sum = Object.keys(ingredients)
      .map(ingridientKey => ingredients[ingridientKey])
      .reduce((s, el) => s + el, 0);

    return sum > 0;
  }

  updatePurchasing = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.history.push('/auth');
    }
  }

  cancelPurchasing = () => {
    this.setState({
      purchasing: false,
    });
  }

  continuePurchasing = () => {
    this.props.onPurchaseBurgerInit();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ings };

    Object.keys(disabledInfo).forEach((key) => {
      disabledInfo[key] = disabledInfo[key] === 0;
    });

    let orderSummary = <Spinner />;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingridients={this.props.ings}
          continuePurchasing={this.continuePurchasing}
          cancelPurchasing={this.cancelPurchasing}
          price={this.props.price.toFixed(2)}
        />
      );
    }

    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingridients={this.props.ings} />
          <BuildControls
            purchasing={this.updatePurchasing}
            purchasable={this.updatePurchasable()}
            totalPrice={this.props.price}
            disabledInfo={disabledInfo}
            onIngridientAdd={this.props.onIngridientAdded}
            onIngridientRemove={this.props.onIngridientRemoved}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
    }

    if (this.props.error) {
      burger = <p>Can&#39;t fetch ingredients.</p>;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          backdropClick={this.cancelPurchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

BurgerBuilder.defaultProps = {
  ings: null,
};

BurgerBuilder.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  onIngredientInited: PropTypes.func.isRequired,
  ings: PropTypes.objectOf(PropTypes.any),
  isAuthenticated: PropTypes.bool.isRequired,
  onPurchaseBurgerInit: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  onIngridientAdded: PropTypes.func.isRequired,
  onIngridientRemoved: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onIngridientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngridientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onIngredientInited: () => dispatch(actions.initIngredients()),
  onPurchaseBurgerInit: () => dispatch(actions.purchaseBurgerInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

/* eslint-disable */
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
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
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
    this.setState({
      purchasing: true,
    });
  }

  cancelPurchasing = () => {
    this.setState({
      purchasing: false,
    });
  }

  continuePurchasing = () => {
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
          ingridients={this.props.igns}
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
          />
        </Aux>
      );
    }

    if (this.props.error) {
      burger = <p>Can't fetch ingredients.</p>
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

BurgerBuilder.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
});

const mapDispatchToProps = (dispatch) => ({
  onIngridientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
  onIngridientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
  onIngredientInited: () => dispatch(burgerBuilderActions.initIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

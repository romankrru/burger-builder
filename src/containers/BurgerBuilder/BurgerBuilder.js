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
import * as actionTypes from '../../store/actions';

const INGRIDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.9,
  meat: 1.2,
  cheese: 0.6,
};

class BurgerBuilder extends Component {
  state = {
    // ingridients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  componentDidMount() {
    // axios.get('https://react-burger-builder-fff98.firebaseio.com/ingridients.json')
    //   .then((res) => {
    //     this.setState({
    //       ingridients: res.data,
    //     });
    //   });
  }

  updatePurchasable = (ingridients) => {
    const sum = Object.keys(ingridients)
      .map(ingridientKey => ingridients[ingridientKey])
      .reduce((s, el) => s + el, 0);

    this.setState({
      purchasable: sum > 0,
    });
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
    const { ingridients } = this.state;
    const queryParams = [];
    const price = this.state.totalPrice;

    Object.keys(ingridients).forEach((ingridientKey) => {
      queryParams.push(`${encodeURIComponent(ingridientKey)}=${encodeURIComponent(ingridients[ingridientKey])}`);
    });

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryParams.join('&')}&price=${price}`,
    });
  }

  addIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updatedCount = oldCount + 1;
    const updatedIngridients = {
      ...this.state.ingridients,
      [type]: updatedCount,
    };
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + INGRIDIENT_PRICES[type];

    this.setState({
      ingridients: updatedIngridients,
      totalPrice: updatedPrice,
    });

    this.updatePurchasable(updatedIngridients);
  }

  removeIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngridients = {
      ...this.state.ingridients,
      [type]: updatedCount,
    };
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - INGRIDIENT_PRICES[type];

    this.setState({
      ingridients: updatedIngridients,
      totalPrice: updatedPrice,
    });

    this.updatePurchasable(updatedIngridients);
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
          price={this.state.totalPrice.toFixed(2)}
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
            purchasable={this.state.purchasable}
            totalPrice={this.state.totalPrice}
            disabledInfo={disabledInfo}
            onIngridientAdd={this.props.onIngridientAdded}
            onIngridientRemove={this.props.onIngridientRemoved}
          />
        </Aux>
      );
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngridientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngridientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGRIDIENT, ingredientName: ingName }),    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

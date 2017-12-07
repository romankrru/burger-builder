import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGRIDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.9,
  meat: 1.2,
  cheese: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingridients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    val: 42
  }

  componentDidMount() {
    axios.get('https://react-burger-builder-fff98.firebaseio.com/ingridients.json')
      .then(res => {
        this.setState({
          ingridients: res.data,
        });
      })
  }

  updatePurchasable = (ingridients) => {
    const sum = Object.keys(ingridients)
      .map((ingridientKey) => {
        return ingridients[ingridientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      this.setState({
        purchasable: sum > 0
      });
  }

  updatePurchasing = () => {
    this.setState({
      purchasing: true
    });
  }

  cancelPurchasing = () => {
    this.setState({
      purchasing: false
    });
  }

  continuePurchasing = () => {
    this.setState({
      loading: true,
    });

    const data = {
      ingridients: this.state.ingridients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Roman',
        address: {
          country: 'Russia',
          street: 'Teststreet',
          zip: '123123'
        },
        email: 'rm07ru@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    
    axios.post('/orders.json', data)
      .then(res => {
        this.setState({
          loading: false,
          purchasing: false,          
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          purchasing: false,
        });
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
      totalPrice: updatedPrice
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
      totalPrice: updatedPrice
    });

    this.updatePurchasable(updatedIngridients);    
  }

  render() {
    const disabledInfo = {...this.state.ingridients};

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = <Spinner />

    if (!this.state.loading && this.state.ingridients) {
      orderSummary = (
        <OrderSummary
          ingridients={this.state.ingridients}
          continuePurchasing={this.continuePurchasing}
          cancelPurchasing={this.cancelPurchasing}
          price={this.state.totalPrice.toFixed(2)}
        />
      );      
    }

    let burger = <Spinner />;

    if (this.state.ingridients) {
      burger = (
        <Aux>
          <Burger ingridients={this.state.ingridients} />
          <BuildControls
            purchasing={this.updatePurchasing}
            purchasable={this.state.purchasable}
            totalPrice={this.state.totalPrice}
            disabledInfo={disabledInfo}
            onIngridientAdd={this.addIngridientHandler}
            onIngridientRemove={this.removeIngridientHandler}
          />
        </Aux>
      )
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

export default withErrorHandler(BurgerBuilder, axios);
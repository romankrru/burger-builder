import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGRIDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.9,
  meat: 1.2,
  cheese: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
    },
    totalPrice: 4
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
  }

  render() {
    const disabledInfo = {...this.state.ingridients};

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Aux>
        <Burger ingridients={this.state.ingridients} />
        <BuildControls
          totalPrice={this.state.totalPrice}
          disabledInfo={disabledInfo}
          onIngridientAdd={this.addIngridientHandler}
          onIngridientRemove={this.removeIngridientHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      cheese: 1,
      salad: 1,
      bacon: 2,
      meat: 1,
      cheese: 2
    }
  }

  render() {
    return (
      <Aux>
        <Burger ingridients={this.state.ingridients} />
        <div>Burger Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
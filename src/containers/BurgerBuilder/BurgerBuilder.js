import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
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
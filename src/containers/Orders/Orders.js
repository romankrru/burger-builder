import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import styles from './Orders.css';

class Orders extends Component {
  state = {

  }

  render() {
    return (
      <div className={styles.Orders}>
        <Order />
      </div>
    );
  }
}

export default Orders;

/* eslint-disable */

import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import styles from './Orders.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('orders.json')
      .then((res) => {
        const fetchedOrders = [];

        Object.keys(res.data).forEach(key => {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        })

        console.log(fetchedOrders);
        

        this.setState({
          loading: false,
          orders: fetchedOrders,
        });
      })
      .catch((err) => {        
        this.setState({ loading: false });
      });
  }

  render() {
    let orders;

    if (this.state.loading) {
      orders = null;
    }

    return (
      <div className={styles.Orders}>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);

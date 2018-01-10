import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import styles from './Orders.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.onOrdersFetch(this.props.token, this.props.userId);
  }

  render() {
    let orders;

    if (this.props.loading) {
      orders = <Spinner />;
    } else {
      orders = this.props.orders.map(ord => (
        <Order key={ord.id} ingridients={ord.ingridients} price={ord.totalPrice} />
      ));
    }

    return (
      <div className={styles.Orders}>
        {orders}
      </div>
    );
  }
}

Orders.propTypes = {
  onOrdersFetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrdersFetch: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

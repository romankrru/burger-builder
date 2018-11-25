import * as actionTypes from '../actions/actionTypes';

/* PURCHASE */
export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData, token) => ({
  type: actionTypes.PURCHASE_BURGER,
  orderData: orderData,
  token: token,
});

export const purchaseBurgerInit = () => ({
  type: actionTypes.PURCHASE_BURGER_INIT,
});

/* FETCH ORDERS */
export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = err => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: err,
});

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  token: token,
  userId: userId,
});

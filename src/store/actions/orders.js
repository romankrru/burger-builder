import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurger = orderData => (dispatch) => {
  axios.post('/orders.json', orderData)
    .then((res) => {
      console.log(res.data);
      dispatch(purchaseBurgerSuccess(res.data, orderData));
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err));
    });
};


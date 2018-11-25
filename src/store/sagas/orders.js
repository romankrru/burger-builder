import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

  try {
    const res = yield axios.get(`orders.json${queryParams}`);

    const fetchedOrders = [];

    Object.keys(res.data).forEach((key) => {
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    });

    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(actions.fetchOrdersFail(err));
  }
}

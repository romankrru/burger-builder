import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSucces = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    purchased: true,
    loading: false,
    orders: state.orders.concat(newOrder),
  });
};

const fetchOrdersSuccess = (state, action) => updateObject(state, {
  loading: false,
  orders: action.orders,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return updateObject(state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSucces(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });

    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;

import {put} from 'redux-saga/effects';
import * as actionTypes from './actionTypes';

function* logout(action) {
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('idToken');
  yield localStorage.removeItem('localId');

  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}

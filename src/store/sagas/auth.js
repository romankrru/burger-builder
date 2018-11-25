import {delay} from 'redux-saga';
import {put} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSucceed, authLogout} from '../actions'

export function* logoutSaga(action) {
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('idToken');
  yield localStorage.removeItem('localId');
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(authLogout());
}

import {delay} from 'redux-saga';
import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import {logoutSucceed, authLogout, authStart, checkAuthTimeout, authSuccess, authFail} from '../actions'

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

export function* authUserSaga(action) {
  yield put(authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDMgxCy_jY4UXOIBHrlsBkc3A4Ny5stNUo';

  if (action.isSignIn) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDMgxCy_jY4UXOIBHrlsBkc3A4Ny5stNUo';
  }

  const response = yield axios.post(url, authData);

  try {
    const {
      expiresIn,
      idToken,
      localId,
    } = response.data;

    const expirationDate = yield new Date(new Date().getTime() + (Number(expiresIn) * 1000));
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('idToken', idToken);
    yield localStorage.setItem('localId', localId);
    yield put(checkAuthTimeout(expiresIn));
    yield put(authSuccess(response.data));
  } catch (err) {
    console.error(err);
    yield put(authFail(err));
  }
}

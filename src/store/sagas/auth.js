import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import { logoutSucceed, authLogout, authStart, checkAuthTimeout, authSuccess, authFail } from '../actions';

export function* logoutSaga() {
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'idToken');
  yield call([localStorage, 'removeItem'], 'localId');
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield call(delay, action.expirationTime * 1000);
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

  try {
    const response = yield call([axios, 'post'], url, authData);
    // console.log(new Date());

    const {
      expiresIn,
      idToken,
      localId,
    } = response.data;

    const expirationDate = yield new Date(Date.now() + (Number(expiresIn) * 1000));
    yield call([localStorage, 'setItem'], 'expirationDate', expirationDate);
    yield call([localStorage, 'setItem'], 'idToken', idToken);
    yield call([localStorage, 'setItem'], 'localId', localId);
    yield put(checkAuthTimeout(expiresIn));
    yield put(authSuccess(response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(authFail(err));
  }
}

export function* authCheckStateSaga() {
  const idToken = yield localStorage.getItem('idToken');

  if (!idToken) {
    yield put(authLogout());
    return;
  }

  const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

  if (expirationDate < new Date()) {
    yield put(authLogout());
    return;
  }

  const localId = yield localStorage.getItem('localId');

  yield put(authSuccess({
    idToken,
    localId,
  }));

  yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
}

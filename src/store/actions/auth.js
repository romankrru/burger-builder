import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: authData.idToken,
  localId: authData.localId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT,
})

export const checkAuthTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime: expirationTime,
});

export const auth = (email, password, isSignIn) => ({
  type: actionTypes.AUTH_USER,
  email: email,
  password: password,
  isSignIn: isSignIn,
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  const idToken = localStorage.getItem('idToken');

  if (!idToken) {
    dispatch(authLogout());
    return;
  }

  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (expirationDate < new Date()) {
    dispatch(authLogout());
    return;
  }

  const localId = localStorage.getItem('localId');

  dispatch(authSuccess({
    idToken,
    localId,
  }));

  dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
};

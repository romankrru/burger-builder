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

export const authLogout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });
export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime,
});

export const auth = (email, password, isSignIn) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignIn,
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE,
});

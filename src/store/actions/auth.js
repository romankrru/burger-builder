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
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('idToken');
  localStorage.removeItem('localId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = expiresIn => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, Number(expiresIn) * 1000);
};

export const auth = (email, password, isSignIn) => (dispatch) => {
  dispatch(authStart());

  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDMgxCy_jY4UXOIBHrlsBkc3A4Ny5stNUo';

  if (isSignIn) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDMgxCy_jY4UXOIBHrlsBkc3A4Ny5stNUo';
  }

  axios.post(
    url,
    authData,
  )
    .then((res) => {
      console.log(res);

      const {
        expiresIn,
        idToken,
        localId,
      } = res.data;

      const expirationDate = new Date(new Date().getTime() + (Number(expiresIn) * 1000));

      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('localId', localId);

      dispatch(checkAuthTimeout(expiresIn));
      dispatch(authSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};

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
  dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
};

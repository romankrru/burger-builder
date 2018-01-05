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

export const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

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
      dispatch(checkAuthTimeout(res.data.expiresIn));
      dispatch(authSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};

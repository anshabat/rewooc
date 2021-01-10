export const AUTH_CHECK_AUTH = 'AUTH_CHECK_AUTH';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS';
export const AUTH_SIGN_IN_FAIL = 'AUTH_SIGN_IN_FAIL';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS';

export const signIn = (username, password) => {
  return {type: AUTH_SIGN_IN, payload: {username, password}}
};

export const signInSuccess = () => {
  return {type: AUTH_SIGN_IN_SUCCESS}
};

export const signInFail = (error) => {
  return {type: AUTH_SIGN_IN_FAIL, error};
};

export const signOut = () => {
  return {type: AUTH_SIGN_OUT}
};

export const signOutSuccess = () => {
  return {type: AUTH_SIGN_OUT_SUCCESS}
};

export const checkAuth = () => {
  return {type: AUTH_CHECK_AUTH}
};
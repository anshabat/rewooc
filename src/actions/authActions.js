export const AUTH_CHECK_AUTH = 'AUTH_CHECK_AUTH';
export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_FAIL = 'USER_SIGN_IN_FAIL';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';

export const signIn = (username, password) => {
  return {type: USER_SIGN_IN, payload: {username, password}}
};

export const signInSuccess = () => {
  return {type: USER_SIGN_IN_SUCCESS}
};

export const signInFail = (error) => {
  return {type: USER_SIGN_IN_FAIL, error};
};

export const signOut = () => {
  return {type: USER_SIGN_OUT}
};

export const signOutSuccess = () => {
  return {type: USER_SIGN_OUT_SUCCESS}
};

export const checkAuth = () => {
  return {type: AUTH_CHECK_AUTH}
};
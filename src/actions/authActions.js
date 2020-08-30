import {initApp} from './appActions';

export const USER_SIGN = 'USER_SIGN';
export const USER_SIGN_IN_START = 'USER_SIGN_IN_START';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_FAIL = 'USER_SIGN_IN_FAIL';

export const AUTH_CHECK_AUTH = 'AUTH_CHECK_AUTH';

export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';

export const signOut = () => {
  return {type: USER_SIGN_OUT}
};

export const signOutSuccess = () => {
  return {type: USER_SIGN_OUT_SUCCESS}
};

export const checkAuth = () => {
  return {type: AUTH_CHECK_AUTH}
};

export const signIn = (username, password) => {
  return {type: USER_SIGN, payload: {username, password}}
};

export const signInStart = () => {
  return {type: USER_SIGN_IN_START};
};

export const signInSuccess = () => dispatch => {
  console.log('thunk')
  dispatch({type: USER_SIGN_IN_SUCCESS});
  dispatch(initApp());
};

export const signInFail = (error) => {
  return {type: USER_SIGN_IN_FAIL, error};
};
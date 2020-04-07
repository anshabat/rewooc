import {initApp} from './initApp';

export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';

export const signOut = () => dispatch => {
  localStorage.removeItem("token");
  dispatch(signOutSuccess());
  dispatch(initApp());
};


export const signOutSuccess = () => {
  return {type: USER_SIGN_OUT_SUCCESS}
};
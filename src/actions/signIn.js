import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';
import {ErrorMessage} from '../shared/errorMessages';
import {initApp} from './initApp';

export const USER_SIGN_IN_START = 'USER_SIGN_IN_START';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_FAIL = 'USER_SIGN_IN_FAIL';

export const signIn = (username, password) => dispatch => {
  dispatch(signInStart());

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  axios.post(ajaxEndpoint("rewooc_get_current_user"), params).then(result => {
    const {success, data: token} = result.data;

    if (success && token) {
      localStorage.setItem("token", token);
      dispatch(signInSuccess());
    } else {
      throw new Error(ErrorMessage.USER_FAIL_TO_SIGN_IN);
    }
  }).catch(error => {
    dispatch(signInFail(error));
  });
};

export const signInStart = () => {
  return {type: USER_SIGN_IN_START};
};

export const signInSuccess = () => dispatch => {
  dispatch({type: USER_SIGN_IN_SUCCESS});
  dispatch(initApp());
};

export const signInFail = (error) => {
  return {type: USER_SIGN_IN_FAIL, error};
};
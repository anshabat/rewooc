import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';

export const INIT_APP_START = "INIT_APP_START";
export const INIT_APP_SUCCESS = "INIT_APP_SUCCESS";
export const INIT_APP_FAIL = "INIT_APP_FAIL";

export const initApp = () => {
  return dispatch => {
    dispatch(initAppStart());
    axios.get(ajaxEndpoint("rewooc_get_common_data")).then(({data}) => {
      dispatch(initAppSuccess(data))
    }).catch(error => {
      dispatch(initAppFail(error))
    })
  }
};

const initAppStart = () => {
  return {type: INIT_APP_START}
};

const initAppSuccess = (data) => {
  return {type: INIT_APP_SUCCESS, payload: data}
};

const initAppFail = (error) => {
  return {type: INIT_APP_FAIL, error}
};
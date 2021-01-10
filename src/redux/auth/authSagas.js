import axios from 'axios'
import {put, call, takeEvery} from 'redux-saga/effects'
import {
  AUTH_CHECK_AUTH,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT,
  AUTH_SIGN_OUT_SUCCESS,
  signOut,
  signOutSuccess,
  signInFail,
  signInSuccess
} from "./authActions";
import {ajaxEndpoint} from "../../shared/utilities";
import {ErrorMessage} from "../../shared/errorMessages";
import {initApp} from "../app/appActions";

export const authSagas = function* () {
  yield takeEvery(AUTH_CHECK_AUTH, checkAuthSaga)
  yield takeEvery(AUTH_SIGN_IN, signInSaga)
  yield takeEvery(AUTH_SIGN_OUT, signOutSaga)
  yield takeEvery([AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT_SUCCESS], reloadAppSaga)
}

const checkAuthSaga = function* () {
  const token = localStorage.getItem("token");
  if (!token) {
    yield put(signOut());
  } else {
    yield put(signInSuccess());
  }
}

const signInSaga = function* (action) {
  const {payload: {username, password}} = action

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  try {
    const result = yield call(axios.post, ajaxEndpoint("rewooc_get_current_user"), params)
    const {success, data: token} = result.data;

    if (success && token) {
      localStorage.setItem("token", token);
      yield put(signInSuccess());
    } else {
      throw new Error(ErrorMessage.USER_FAIL_TO_SIGN_IN);
    }
  } catch (error) {
    yield put(signInFail(error));
  }
}

const signOutSaga = function* () {
  localStorage.removeItem("token");
  yield put(signOutSuccess());
}

const reloadAppSaga = function* () {
  yield put(initApp());
}
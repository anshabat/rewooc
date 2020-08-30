import axios from 'axios'
import {put, call, takeEvery} from 'redux-saga/effects'
import {
  AUTH_CHECK_AUTH,
  USER_SIGN,
  USER_SIGN_OUT,
  signOut,
  signOutSuccess,
  signInFail,
  signInStart,
  signInSuccess
} from "../actions/authActions";
import {ajaxEndpoint} from "../shared/utilities";
import {ErrorMessage} from "../shared/errorMessages";
import {initApp} from "../actions/appActions";

export const authSagas = function* () {
  yield takeEvery(AUTH_CHECK_AUTH, checkAuthSaga)
  yield takeEvery(USER_SIGN, signInSaga)
  yield takeEvery(USER_SIGN_OUT, signOutSaga)
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

  yield put(signInStart());

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
  yield put(initApp());
}
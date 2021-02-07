import { put, call, takeEvery } from 'redux-saga/effects'
import { authApi } from 'app-data'
import {
  AUTH_CHECK_AUTH,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT,
  AUTH_SIGN_OUT_SUCCESS,
  signOut,
  signOutSuccess,
  signInFail,
  signInSuccess,
} from './authActions'
import { ErrorMessage } from '../../shared/errorMessages'
import { initApp } from '../app/appActions'
import { ISignInAction } from './authTypes'

function* checkAuthSaga() {
  const token = localStorage.getItem('token')
  if (!token) {
    yield put(signOut())
  } else {
    yield put(signInSuccess())
  }
}

function* signInSaga(action: ISignInAction) {
  try {
    const result = yield call(
      authApi.fetchCurrentUser,
      action.payload.username,
      action.payload.password
    )
    const { success, data: token } = result.data

    if (success && token) {
      localStorage.setItem('token', token)
      yield put(signInSuccess())
    } else {
      throw new Error(ErrorMessage.USER_FAIL_TO_SIGN_IN)
    }
  } catch (error) {
    yield put(signInFail(error))
  }
}

function* signOutSaga() {
  localStorage.removeItem('token')
  yield put(signOutSuccess())
}

function* reloadAppSaga() {
  yield put(initApp())
}

export function* authSagas() {
  yield takeEvery(AUTH_CHECK_AUTH, checkAuthSaga)
  yield takeEvery(AUTH_SIGN_IN, signInSaga)
  yield takeEvery(AUTH_SIGN_OUT, signOutSaga)
  yield takeEvery([AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT_SUCCESS], reloadAppSaga)
}

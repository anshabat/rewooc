import {appSaga} from "./appSagas";
import {cartSagas} from "./cartSagas";
import {all} from 'redux-saga/effects'

export const rootSaga = function* () {
  yield all([appSaga(), cartSagas()])
}
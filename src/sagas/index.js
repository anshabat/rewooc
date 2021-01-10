import {appSaga} from "./appSagas";
import {cartSagas} from "./cartSagas";
import {all} from 'redux-saga/effects'
import {catalogSagas} from "./catalogSagas";
import {authSagas} from "./authSagas";

export const rootSaga = function* () {
  yield all([appSaga(), cartSagas(), catalogSagas(), authSagas()])
}
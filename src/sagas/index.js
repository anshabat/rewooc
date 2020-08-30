import {appSaga} from "./appSagas";
import {all} from 'redux-saga/effects'

export const rootSaga = function* () {
  yield all([appSaga()])
}
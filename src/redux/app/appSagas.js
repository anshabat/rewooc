import {fetchGeneralData} from "app-data";
import {INIT_APP, initAppFail, initAppSuccess} from "./appActions";
import {call, put, takeEvery} from "redux-saga/effects";

export const appSaga = function* () {
  yield takeEvery(INIT_APP, initAppSaga);
}

const initAppSaga = function* () {
  const {data} = yield call(fetchGeneralData)
  try {
    yield put(initAppSuccess(data))
  } catch (error) {
    yield put(initAppFail(error))
  }
}
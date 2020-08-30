import axios from "axios";
import {ajaxEndpoint} from "../shared/utilities";
import {INIT_APP, initAppFail, initAppSuccess} from "../actions/initApp";
import {call, put, takeEvery} from "redux-saga/effects";

export const appSaga = function* () {
  yield takeEvery(INIT_APP, initAppSaga);
}

const initAppSaga = function* () {
  const {data} = yield call(axios.get, ajaxEndpoint("rewooc_get_common_data"))
  try {
    yield put(initAppSuccess(data))
  } catch (error) {
    yield put(initAppFail(error))
  }
}
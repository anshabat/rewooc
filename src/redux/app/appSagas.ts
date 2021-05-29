import { appApi } from 'app-api'
import { call, put, takeEvery } from 'redux-saga/effects'
import { INIT_APP, initAppFail, initAppSuccess } from './appActions'
import { Await } from '../../shared/utilityTypes'

function* initAppSaga() {
  try {
    const data: Await<ReturnType<typeof appApi.fetchGeneralData>> = yield call(
      appApi.fetchGeneralData
    )
    yield put(initAppSuccess(data))
  } catch (error) {
    yield put(initAppFail(error))
  }
}

export function* appSaga() {
  yield takeEvery(INIT_APP, initAppSaga)
}

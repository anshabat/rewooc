import { call, put, takeEvery } from 'redux-saga/effects'
import { catalogApi } from 'app-data'
import {
  CATALOG_PAGE_LOAD,
  loadCatalogPageSuccess,
  loadCatalogPageFail,
} from './catalogActions'
import { ILoadCatalogPageAction } from './catalogTypes'

function* loadCatalogPageSaga(action: ILoadCatalogPageAction) {
  const { data } = yield call(catalogApi.fetchCatalogPage, action.payload.url)
  try {
    yield put(loadCatalogPageSuccess(data))
  } catch (error) {
    yield put(loadCatalogPageFail(error))
  }
}

export function* catalogSagas() {
  yield takeEvery(CATALOG_PAGE_LOAD, loadCatalogPageSaga)
}

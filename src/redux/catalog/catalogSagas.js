import { call, put, takeEvery } from 'redux-saga/effects'
import { catalogApi } from 'app-data'
import {
  CATALOG_PAGE_LOAD,
  loadCatalogPageSuccess,
  loadCatalogPageFail,
} from './catalogActions'

function* loadCatalogPageSaga(action) {
  const {
    payload: { url },
  } = action
  const { data } = yield call(catalogApi.fetchCatalogPage, url)
  try {
    yield put(loadCatalogPageSuccess(data))
  } catch (error) {
    yield put(loadCatalogPageFail(error))
  }
}

export function* catalogSagas() {
  yield takeEvery(CATALOG_PAGE_LOAD, loadCatalogPageSaga)
}

import {CATALOG_PAGE_LOAD, loadCatalogPageSuccess, loadCatalogPageFail} from "./catalogActions";
import {call, put, takeEvery} from "redux-saga/effects";
import {catalogApi} from "app-data";

export const catalogSagas = function* () {
  yield takeEvery(CATALOG_PAGE_LOAD, loadCatalogPageSaga)
}

const loadCatalogPageSaga = function* (action) {
  const {payload: {url}} = action
  const {data} = yield call(catalogApi.fetchCatalogPage, url)
  try {
    yield put(loadCatalogPageSuccess(data))
  } catch (error) {
    yield put(loadCatalogPageFail(error))
  }
}
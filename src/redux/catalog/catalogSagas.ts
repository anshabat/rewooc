import { call, put, takeEvery } from 'redux-saga/effects'
import { Await, catalogApi } from 'app-data'
import {
  CATALOG_PAGE_LOAD,
  loadCatalogPageSuccess,
  loadCatalogPageFail,
} from './catalogActions'
import { ILoadCatalogPageAction } from './catalogTypes'

function* loadCatalogPageSaga(action: ILoadCatalogPageAction) {
  try {
    const pageData: Await<
      ReturnType<typeof catalogApi.fetchCatalogPage>
    > = yield call(catalogApi.fetchCatalogPage, action.payload.url)
    yield put(loadCatalogPageSuccess(pageData))
  } catch (error) {
    yield put(loadCatalogPageFail(error))
  }
}

export function* catalogSagas() {
  yield takeEvery(CATALOG_PAGE_LOAD, loadCatalogPageSaga)
}

import { call, put, takeEvery } from 'redux-saga/effects'
import { catalogApi } from 'api'
import {
  CATALOG_PAGE_LOAD,
  loadCatalogPageSuccess,
  loadCatalogPageFail,
} from './catalogActions'
import { ILoadCatalogPageAction } from './catalogTypes'
import { Await } from "../../shared/utilityTypes";

function* loadCatalogPageSaga(action: ILoadCatalogPageAction) {
  try {
    const pageData: Await<
      ReturnType<typeof catalogApi.fetchCatalogPage>
    > = yield call(catalogApi.fetchCatalogPage, action.payload.url)
    yield put(loadCatalogPageSuccess(pageData))
  } catch (error: any) {
    yield put(loadCatalogPageFail(error))
  }
}

export function* catalogSagas() {
  yield takeEvery(CATALOG_PAGE_LOAD, loadCatalogPageSaga)
}

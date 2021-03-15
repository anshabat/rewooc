import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { history } from '../shared/history'
import app from './app/appReducer'
import cart from './cart/cartReducer'
import catalog from './catalog/catalogReducer'
import auth from './auth/authReducer'
import account from './account/accountReducer'
import { appSaga } from './app/appSagas'
import { cartSagas } from './cart/cartSagas'
import { catalogSagas } from './catalog/catalogSagas'
import { authSagas } from './auth/authSagas'
import { ICartState } from './cart/cartTypes'
import { ICatalogState } from './catalog/catalogTypes'
import { IAuthState } from './auth/authTypes'
import { IAccountState } from './account/accountTypes'
import { Record } from 'immutable'
import { IAppState } from './app/appTypes'

const rootReducer = combineReducers({
  router: connectRouter(history),
  app,
  cart,
  catalog,
  auth,
  account,
  test: (state: any = {}) => ({ ...state }),
})

export type AppStateType = {
  router: any
  app: IAppState
  cart: Record<ICartState>
  catalog: Record<ICatalogState>
  auth: IAuthState
  account: IAccountState
  test: any
}
// Todo fix this after migrating to immer
//export type AppStateType = ReturnType<typeof rootReducer>

function* rootSaga() {
  yield all([appSaga(), cartSagas(), catalogSagas(), authSagas()])
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
)
sagaMiddleware.run(rootSaga)

export default store

import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import app from './app/appReducer'
import cart from './cart/cartReducer'
import catalog from './catalog/catalogReducer'
import auth from './auth/authReducer'
import account from './account/accountReducer'
import { appSaga } from './app/appSagas'
import { cartSagas } from './cart/cartSagas'
import { catalogSagas } from './catalog/catalogSagas'
import { authSagas } from './auth/authSagas'

const rootReducer = combineReducers({
  app,
  cart,
  catalog,
  auth,
  account,
  test: (state: any = {}) => ({ ...state }),
})

export type AppStateType = ReturnType<typeof rootReducer>

function* rootSaga() {
  yield all([appSaga(), cartSagas(), catalogSagas(), authSagas()])
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)
sagaMiddleware.run(rootSaga)

export default store

import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {connectRouter, routerMiddleware} from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";
import {history} from "../shared/history";
import app from './app/appReducer'
import cart from "../reducers/cart";
import catalog from "../reducers/catalog";
import auth from "../reducers/auth";
import account from "../reducers/account";
import {appSaga} from './app/appSagas'
import {cartSagas} from "../sagas/cartSagas";
import {catalogSagas} from "../sagas/catalogSagas";
import {authSagas} from "../sagas/authSagas";

const rootReducer = (history) => combineReducers({
  router: connectRouter(history), app, cart, catalog, auth, account
})

const rootSaga = function* () {
  yield all([appSaga(), cartSagas(), catalogSagas(), authSagas()])
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
sagaMiddleware.run(rootSaga)

export default store
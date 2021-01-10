import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import axios from "axios";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension"
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router'
import App from "./App";
import {rootReducer} from "./reducers";
import {rootSaga} from "./sagas";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  error => Promise.reject(error)
);

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.querySelector("#app")
);
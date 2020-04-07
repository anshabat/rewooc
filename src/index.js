import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension"
import axios from "axios";
import App from "./App";
import {rootReducer} from "./reducers";

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

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.querySelector("#app")
);
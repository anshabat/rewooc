import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Provider} from "react-redux";
import App from "./App";
import store from "./redux/store";

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

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.querySelector("#app")
);
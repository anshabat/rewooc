import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./redux/reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

axios.defaults.headers.common["Authorization"] = "Basic " + Buffer.from("admin:admin").toString("base64");

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector("#app")
);
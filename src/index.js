import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = "Basic " + Buffer.from("admin:admin").toString("base64");

ReactDOM.render(<App/>, document.querySelector("#app"));
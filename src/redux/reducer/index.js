import {combineReducers} from "redux";
import cart from "./cart";
import app from "./app";
import catalog from "./catalog";
import auth from "./auth";

export const rootReducer = combineReducers({app, cart, catalog, auth});
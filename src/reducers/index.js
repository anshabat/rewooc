import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'
import cart from "./cart";
import app from "./app";
import catalog from "./catalog";
import auth from "./auth";
import account from "./account";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history), app, cart, catalog, auth, account
})

export const rootReducer = createRootReducer;
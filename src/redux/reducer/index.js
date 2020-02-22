import {combineReducers} from "redux";
import cart from "./cart";
import app from "./app";
import products from "./products"

export const rootReducer = combineReducers({cart, app, products});
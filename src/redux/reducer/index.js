import {combineReducers} from "redux";
import cart from "./cart";
import app from "./app";

export const rootReducer = combineReducers({cart, app});
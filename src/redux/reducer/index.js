import {combineReducers} from "redux";
import cart, {initialState as cartState} from "./cart.js";

export const rootReducer = combineReducers({cart});

export const initialState = ({cart}) => {
  return {
    cart: cartState(cart)
  }
};
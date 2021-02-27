export { default as catalogApi } from './catalog/catalogData'
export { default as cartApi } from './cart/cartData'
export { default as appApi } from './app/appData'
export { default as authApi } from './auth/authData'
export { ICartItem, ICartPage } from './cart/cartTypes'

export type Await<T> = T extends PromiseLike<infer U> ? U : T

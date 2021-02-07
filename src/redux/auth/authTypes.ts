import {
  AUTH_CHECK_AUTH,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT,
  AUTH_SIGN_OUT_SUCCESS,
} from './authActions'

export interface IAuthState {
  loading: boolean
  error: boolean | Error
}

interface ISignInAction {
  type: typeof AUTH_SIGN_IN
  payload: { username: string; password: string }
}

interface ISignInSuccessAction {
  type: typeof AUTH_SIGN_IN_SUCCESS
}

interface ISignInFailAction {
  type: typeof AUTH_SIGN_IN_FAIL
  error: Error
}

interface ISignOutAction {
  type: typeof AUTH_SIGN_OUT
}

interface ISignOutSuccessAction {
  type: typeof AUTH_SIGN_OUT_SUCCESS
}

interface ICheckAuthAction {
  type: typeof AUTH_CHECK_AUTH
}

export type AuthActionTypes =
  | ISignInAction
  | ISignInSuccessAction
  | ISignInFailAction
  | ISignOutAction
  | ISignOutSuccessAction
  | ICheckAuthAction

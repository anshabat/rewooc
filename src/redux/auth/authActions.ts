import { AuthActionTypes } from './authTypes'

export const AUTH_CHECK_AUTH = 'AUTH_CHECK_AUTH'
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN'
export const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS'
export const AUTH_SIGN_IN_FAIL = 'AUTH_SIGN_IN_FAIL'
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT'
export const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS'

export const signIn = (username: string, password: string): AuthActionTypes => {
  return {
    type: AUTH_SIGN_IN,
    payload: { username, password },
  }
}

export const signInSuccess = (): AuthActionTypes => {
  return { type: AUTH_SIGN_IN_SUCCESS }
}

export const signInFail = (error: Error): AuthActionTypes => {
  return { type: AUTH_SIGN_IN_FAIL, error }
}

export const signOut = (): AuthActionTypes => {
  return { type: AUTH_SIGN_OUT }
}

export const signOutSuccess = (): AuthActionTypes => {
  return { type: AUTH_SIGN_OUT_SUCCESS }
}

export const checkAuth = (): AuthActionTypes => {
  return { type: AUTH_CHECK_AUTH }
}

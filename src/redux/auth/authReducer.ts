import { Record } from 'immutable'
import { AuthActionTypes, IAuthState } from './authTypes'
import {
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT_SUCCESS,
} from './authActions'

const InitialState = Record<IAuthState>({
  loading: false,
  error: false,
})

const reducer = (
  state = new InitialState(),
  action: AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return state.set('loading', true).set('error', false)
    case AUTH_SIGN_IN_SUCCESS:
      return state.set('loading', false).set('error', false)
    case AUTH_SIGN_IN_FAIL:
      return state.set('loading', false).set('error', action.error)
    case AUTH_SIGN_OUT_SUCCESS:
      return state
    default:
      return state
  }
}

export default reducer

import { AuthActionTypes, IAuthState } from './authTypes'
import {
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT_SUCCESS,
} from './authActions'

const InitialState = {
  loading: false,
  error: false,
}

const reducer = (state = InitialState, action: AuthActionTypes): IAuthState => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return { ...state, loading: true, error: false }
    case AUTH_SIGN_IN_SUCCESS:
      return { ...state, loading: false, error: false }
    case AUTH_SIGN_IN_FAIL:
      return { ...state, loading: false, error: action.error }
    case AUTH_SIGN_OUT_SUCCESS:
    default:
      return state
  }
}

export default reducer

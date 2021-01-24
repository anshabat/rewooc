import { Record } from 'immutable'
import {
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT_SUCCESS,
} from './authActions'

const initialState = Record({
  loading: false,
  error: false,
})

const reducer = (state = new initialState(), action) => {
  const { type, error } = action

  switch (type) {
    case AUTH_SIGN_IN:
      return state.set('loading', true).set('error', false)
    case AUTH_SIGN_IN_SUCCESS:
      return state.set('loading', false).set('error', false)
    case AUTH_SIGN_IN_FAIL:
      return state.set('loading', false).set('error', error)
    case AUTH_SIGN_OUT_SUCCESS:
      return state
    default:
      return state
  }
}

export default reducer

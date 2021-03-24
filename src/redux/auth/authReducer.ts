import produce from 'immer'
import { AuthActionTypes, IAuthState } from './authTypes'
import {
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
} from './authActions'

const initialState: IAuthState = {
  loading: false,
  error: false,
}

const reducer = (state = initialState, action: AuthActionTypes): IAuthState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AUTH_SIGN_IN:
        draft.loading = true
        draft.error = false
        break
      case AUTH_SIGN_IN_SUCCESS:
        draft.loading = false
        draft.error = false
        break
      case AUTH_SIGN_IN_FAIL:
        console.error(action.error)
        draft.loading = false
        draft.error = action.error
        break
    }
  })
}

export default reducer

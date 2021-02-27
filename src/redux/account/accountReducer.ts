import { fromJS, Record } from 'immutable'
import { INIT_APP_SUCCESS } from '../app/appActions'
import { IAccountState } from './accountTypes'
import { AppActionTypes } from '../app/appTypes'

const InitialState = Record<IAccountState>({
  user: null,
})

const reducer = (
  state = new InitialState(),
  action: AppActionTypes
): IAccountState => {
  switch (action.type) {
    case INIT_APP_SUCCESS:
      return state.set('user', fromJS(action.payload.user))
    default:
      return state
  }
}

export default reducer

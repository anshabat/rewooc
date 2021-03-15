import { INIT_APP_SUCCESS } from '../app/appActions'
import { IAccountState } from './accountTypes'
import { AppActionTypes } from '../app/appTypes'

const InitialState: IAccountState = {
  user: null,
}

const reducer = (
  state = InitialState,
  action: AppActionTypes
): IAccountState => {
  switch (action.type) {
    case INIT_APP_SUCCESS:
      return { ...state, user: action.payload.user }
    default:
      return state
  }
}

export default reducer

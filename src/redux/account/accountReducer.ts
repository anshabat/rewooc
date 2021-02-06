import { Record } from 'immutable'
import { INIT_APP_SUCCESS } from '../app/appActions'

interface IAccountState {
  user: any
}

const InitialState = Record<IAccountState>({
  user: null,
})

const reducer = (state = new InitialState(), action): IAccountState => {
  const { type, payload } = action

  switch (type) {
    case INIT_APP_SUCCESS:
      return state.set('user', payload.user)
    default:
      return state
  }
}

export default reducer

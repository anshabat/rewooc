import { Record, Map } from 'immutable'
import { INIT_APP_FAIL, INIT_APP, INIT_APP_SUCCESS } from './appActions'

const filterState = (data) => {
  // TODO eslint this
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { cart, user, ...rest } = data
  return rest
}

export interface IAppState {
  data: Map<string, any>
  loading: boolean
  error: boolean
}

const InitialState = Record<IAppState>({
  data: Map({}),
  loading: true,
  error: false,
})

const reducer = (state = new InitialState(), action): IAppState => {
  const { type, error, payload } = action

  switch (type) {
    case INIT_APP:
      return state.set('loading', true).set('error', false)
    case INIT_APP_SUCCESS: {
      const data = filterState(payload)
      return state.set('loading', false).set('error', false).set('data', data)
    }
    case INIT_APP_FAIL:
      return state.set('loading', false).set('error', error)
    default:
      return state
  }
}

export default reducer

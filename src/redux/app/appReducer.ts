import { Record, Map, fromJS } from "immutable";
import { INIT_APP_FAIL, INIT_APP, INIT_APP_SUCCESS } from './appActions'
import { AppActionTypes, IAppState } from './appTypes'
import { IGeneralData } from '../../data/app/appTypes'

const filterState = (
  data: IGeneralData
): Omit<IGeneralData, 'cart' | 'user'> => {
  // TODO eslint this
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { cart, user, ...rest } = data
  return rest
}

const InitialState = Record<IAppState>({
  data: Map({}),
  loading: true,
  error: false,
})

const reducer = (
  state = new InitialState(),
  action: AppActionTypes
): IAppState => {
  switch (action.type) {
    case INIT_APP:
      return state.set('loading', true).set('error', false)
    case INIT_APP_SUCCESS: {
      const data = filterState(action.payload)
      return state.set('loading', false).set('error', false).set('data', fromJS(data))
    }
    case INIT_APP_FAIL:
      return state.set('loading', false).set('error', action.error)
    default:
      return state
  }
}

export default reducer

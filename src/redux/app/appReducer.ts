import { INIT_APP_FAIL, INIT_APP, INIT_APP_SUCCESS } from './appActions'
import { AppActionTypes, IAppState } from './appTypes'
import { IGeneralData } from 'app-data'
import { AppContextType } from '../../context/appContext'

const filterState = (data: IGeneralData): AppContextType => {
  // TODO eslint this
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { cart, user, ...rest } = data
  return rest
}

const InitialState: IAppState = {
  data: null,
  loading: true,
  error: false,
}

const reducer = (state = InitialState, action: AppActionTypes): IAppState => {
  switch (action.type) {
    case INIT_APP:
      return { ...state, loading: true, error: false }
    case INIT_APP_SUCCESS: {
      const data = filterState(action.payload)
      return { ...state, loading: false, error: false, data }
    }
    case INIT_APP_FAIL:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default reducer

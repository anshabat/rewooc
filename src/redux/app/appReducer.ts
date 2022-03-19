import {
  APP_HIDE_ERROR,
  INIT_APP,
  INIT_APP_FAIL,
  INIT_APP_SUCCESS,
} from './appActions'
import produce from 'immer'
import { IGeneralData } from 'api'
import { AppActionTypes, IAppState } from './appTypes'
import { AppContextType } from '../../context/appContext'

const separateStateFromContext = (data: IGeneralData): AppContextType => {
  // TODO eslint this
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { cart, user, ...rest } = data
  return rest
}

const initialState: IAppState = {
  data: null,
  loading: true,
  error: false,
}

const reducer = (state = initialState, action: AppActionTypes): IAppState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_APP:
        draft.loading = true
        draft.error = false
        break
      case INIT_APP_SUCCESS:
        draft.loading = false
        draft.error = false
        draft.data = separateStateFromContext(action.payload)
        break
      case INIT_APP_FAIL:
        draft.loading = false
        draft.error = action.error
        break
      case APP_HIDE_ERROR:
        draft.error = false
    }
  })
}

export default reducer

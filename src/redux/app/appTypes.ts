import { INIT_APP, INIT_APP_FAIL, INIT_APP_SUCCESS } from './appActions'
import { AppContextType } from '../../context/appContext'

/**
 * State types
 */
export interface IAppState {
  data: AppContextType | null
  loading: boolean
  error: boolean | Error
}

/**
 * Action types
 */
interface IInitAppAction {
  type: typeof INIT_APP
}

interface IInitAppSuccessAction {
  type: typeof INIT_APP_SUCCESS
  payload: any
}

interface IInitAppFailAction {
  type: typeof INIT_APP_FAIL
  error: Error
}

export type AppActionTypes =
  | IInitAppAction
  | IInitAppSuccessAction
  | IInitAppFailAction

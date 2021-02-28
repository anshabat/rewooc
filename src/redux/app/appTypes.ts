import { INIT_APP, INIT_APP_FAIL, INIT_APP_SUCCESS } from './appActions'
import { ImmutableMap } from '../../shared/utilityTypes'
import { AppContextType } from '../../context/appContext'

/**
 * State types
 */
export interface IAppState {
  data: AppContextType
  loading: boolean
  error: boolean | Error
}

export interface ImmutableAppState extends Omit<IAppState, 'data'> {
  data: ImmutableMap<AppContextType>
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

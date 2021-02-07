import { Map } from 'immutable'
import { INIT_APP, INIT_APP_FAIL, INIT_APP_SUCCESS } from './appActions'

export interface IAppState {
  data: Map<string, any>
  loading: boolean
  error: boolean | Error
}

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

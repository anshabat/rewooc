import { AppActionTypes } from './appTypes'

export const INIT_APP = 'INIT_APP'
export const INIT_APP_SUCCESS = 'INIT_APP_SUCCESS'
export const INIT_APP_FAIL = 'INIT_APP_FAIL'

export const initApp = (): AppActionTypes => {
  return { type: INIT_APP }
}

export const initAppSuccess = (data: any): AppActionTypes => {
  return {
    type: INIT_APP_SUCCESS,
    payload: data,
  }
}

export const initAppFail = (error: Error): AppActionTypes => {
  return {
    type: INIT_APP_FAIL,
    error,
  }
}

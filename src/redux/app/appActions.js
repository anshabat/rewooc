export const INIT_APP = 'INIT_APP'
export const INIT_APP_SUCCESS = 'INIT_APP_SUCCESS'
export const INIT_APP_FAIL = 'INIT_APP_FAIL'

export const initApp = () => {
  return { type: INIT_APP }
}

export const initAppSuccess = (data) => {
  return { type: INIT_APP_SUCCESS, payload: data }
}

export const initAppFail = (error) => {
  return { type: INIT_APP_FAIL, error }
}

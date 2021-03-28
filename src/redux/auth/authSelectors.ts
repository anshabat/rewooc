import { AppStateType } from '../store'
import { createSelector } from 'reselect'
import { IAuthState } from './authTypes'

export const selectAuthProcess = createSelector<
  AppStateType,
  IAuthState,
  { loading: boolean; error: boolean | Error }
>(
  (state) => state.auth,
  (result) => {
    return { loading: result.loading, error: result.error }
  }
)

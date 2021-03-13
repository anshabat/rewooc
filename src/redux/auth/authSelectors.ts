import { AppStateType } from '../store'
import { createSelector } from 'reselect'
import { IAuthState } from './authTypes'
import { Record } from 'immutable'

export const selectAuthProcess = createSelector<
  AppStateType,
  Record<IAuthState>,
  { loading: boolean; error: boolean | Error }
>(
  (state) => state.auth,
  (result) => {
    return { loading: result.get('loading'), error: result.get('error') }
  }
)

import { createSelector } from 'reselect'
import { AppStateType } from '../store'

export const selectAccountUser = createSelector<AppStateType, string, string>(
  (state) => state.account.get('user'),
  (user) => user
)

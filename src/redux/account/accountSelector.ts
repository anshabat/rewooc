import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { IUser } from 'app-types'

export const selectAccountUser = createSelector<AppStateType, any, IUser>(
  (state) => state.account.get('user'),
  (user) => (user ? user.toJS() : null)
)

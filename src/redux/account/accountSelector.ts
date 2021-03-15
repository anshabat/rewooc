import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { ImmutableUserType, IUser } from 'app-types'

export const selectAccountUser = createSelector<AppStateType, ImmutableUserType, IUser>(
  (state) => state.account.get('user'),
  (user) => (user ? user.toJS() : null)
)

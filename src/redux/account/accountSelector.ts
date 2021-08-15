import { AppStateType } from '../store'
import { IUser } from 'app-types'

export const selectAccountUser = (state: AppStateType): IUser | null => {
  return state.account.user
}

export const selectAccountUserId = (state: AppStateType): number => {
  return state.account.user?.id ?? 0
}

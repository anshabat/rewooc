import { AppStateType } from '../store'
import { IUser } from 'app-types'

export const selectAccountUser = (state: AppStateType): IUser | null => state.account.user
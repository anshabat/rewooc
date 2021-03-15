import { ImmutableUserType, IUser } from 'app-types'
import { ImmutableMap } from '../../shared/utilityTypes'

export interface IAccountState {
  user: ImmutableUserType | null
}

export type ImmutableUserType = ImmutableMap<IUser>

import { Map } from "immutable";

export interface IUserAddress {
  address: number
}

export interface IUser {
  id: number
  displayName: string
  email: string
  firstName: string
  lastName: string
}

export type ImmutableUserType = IUser & Map<string, any>
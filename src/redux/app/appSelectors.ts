import { AppStateType } from '../store'
import { IAppState } from './appTypes'

export const selectApp = (state: AppStateType): IAppState => state.app

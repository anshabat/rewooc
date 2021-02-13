import { AppStateType } from '../store'
import { IApp } from './appTypes'

export const selectApp = (state: AppStateType): IApp => state.app.toJS()

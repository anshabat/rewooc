import produce from 'immer'
import { INIT_APP_SUCCESS } from '../app/appActions'
import { IAccountState } from './accountTypes'
import { AppActionTypes } from '../app/appTypes'

const initialState: IAccountState = {
  user: null,
}

const reducer = (
  state = initialState,
  action: AppActionTypes
): IAccountState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_APP_SUCCESS:
        draft.user = action.payload.user
    }
  })
}

export default reducer

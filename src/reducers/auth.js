import {USER_SIGN_IN_FAIL, USER_SIGN_IN_START, USER_SIGN_IN_SUCCESS} from '../actions/signIn';
import {USER_SIGN_OUT_SUCCESS} from '../actions/signOut';

const initialState = {
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  const {type, error} = action;

  switch (type) {
    case USER_SIGN_IN_START:
      return {...state, loading: true, error: false};
    case USER_SIGN_IN_SUCCESS:
      return {...state, loading: false, error: false};
    case USER_SIGN_IN_FAIL:
      return {...state, loading: false, error: error};
    case USER_SIGN_OUT_SUCCESS:
      return {...state};
    default:
      return state;
  }

};

export default reducer
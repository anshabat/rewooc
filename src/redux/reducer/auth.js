import {USER_SIGN_IN_FAIL, USER_SIGN_IN_START, USER_SIGN_IN_SUCCESS, USER_SIGN_OUT} from "../actionTypes";

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
    case USER_SIGN_OUT:
      return {...state};
    default:
      return state;
  }

};

export default reducer
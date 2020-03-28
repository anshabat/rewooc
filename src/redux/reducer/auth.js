import {USER_SIGN_IN_FAIL, USER_SIGN_IN_START, USER_SIGN_IN_SUCCESS} from "../actionTypes";

const initialState = {
  userId: 0,
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  const {type, payload, error} = action;

  switch (type) {
    case USER_SIGN_IN_START:
      return {...state, loading: true, error: false};
    case USER_SIGN_IN_SUCCESS:
      return {...state, loading: false, error: false, userId: payload};
    case USER_SIGN_IN_FAIL:
      return {...state, loading: false, error: error};
    default:
      return state;
  }

};

export default reducer
import {Record} from "immutable";
import {
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_SUCCESS
} from '../actions/authActions';

const initialState = Record({
  loading: false,
  error: false
});

const reducer = (state = new initialState(), action) => {
  const {type, error} = action;

  switch (type) {
    case USER_SIGN_IN:
      return state.set('loading', true).set('error', false);
    case USER_SIGN_IN_SUCCESS:
      return state.set('loading', false).set('error', false);
    case USER_SIGN_IN_FAIL:
      return state.set('loading', false).set('error', error);
    case USER_SIGN_OUT_SUCCESS:
      return state;
    default:
      return state;
  }

};

export default reducer
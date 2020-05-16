import {INIT_APP_FAIL, INIT_APP_START, INIT_APP_SUCCESS} from "../actions/initApp";

const initialState = {
  data: {},
  loading: true,
  error: false
};

const reducer = (state = initialState, action) => {
  const {type, error, payload} = action;

  switch (type) {
    case INIT_APP_START:
      return {...state, loading: true, error: false};
    case INIT_APP_SUCCESS:
      const data = filterState(payload);
      return {...state, loading: false, error: false, data};
    case INIT_APP_FAIL:
      return {...state, loading: false, error: error};
    default:
      return {...state}
  }
};

const filterState = (data) => {
  const {cart, user, ...rest} = data;
  return rest;
};

export default reducer;
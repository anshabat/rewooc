import {INIT_APP_FAIL, INIT_APP_START, INIT_APP_SUCCESS} from "../actionTypes";

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
      return {...state, loading: false, error: false, data: payload};
    case INIT_APP_FAIL:
      return {...state, loading: false, error: error};
    default:
      return {...state}
  }
};

export default reducer;